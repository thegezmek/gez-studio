"use client";

import Link from "next/link";
import { getImageProps } from "next/image";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { DottedTurkiyeText } from "@/components/ui/DottedTurkiye";
import { getProjectDetail } from "@/data/project-details";
import { projectPath } from "@/lib/project-path";
import { site } from "@/data/site";
import type { Project } from "@/types/project";
import { scrollPageToTop } from "@/lib/scroll-to-top";
import { usePrefersReducedMotion, useMediaQuery, useHydrated } from "@/lib/use-media-query";
import { ARCHIVE_KINDS, archiveKind, yearOf, type ArchiveKind } from "@/lib/film-meta";

interface HomeEditorialOpenProps {
  films: Project[];
}

const FEATURED_MINUTES = 40;

type HomeStill = {
  href: string;
  title: string;
  src: string;
  crop?: boolean;
};

// Matches .home-frames__card: min(78vw, 18.5rem) on phones, clamp(17rem, 32vw, 34rem) above.
const FRAME_SIZES = "(max-width: 800px) 78vw, 34rem";

const HOME_STILLS: HomeStill[] = [
  { href: "/films/kuzaya", title: "Kuzaya", src: "/projects/kuzaya/stills/still-01.jpg" },
  { href: "/films/from-ashes", title: "From Ashes I", src: "/projects/from-ashes-i/stills/still-01.jpg" },
  { href: "/films/proteen", title: "Proteen", src: "/projects/proteen/stills/still-02.jpg" },
  { href: "/films/green-refuge", title: "Green Refuge", src: "/projects/green-refuge/stills/still-04.jpg" },
  { href: "/films/worldview-seaweed", title: "Worldview Seaweed", src: "/projects/worldview-seaweed/stills/still-08.jpg" },
  { href: "/films/bon-aime", title: "Bon Aimé", src: "/projects/bon-aime/stills/still-04.jpg" },
  { href: "/films/from-ashes-ii", title: "From Ashes II", src: "/projects/from-ashes-ii/stills/still-04.jpg" },
  { href: "/films/empower", title: "Empower", src: "/projects/empower/stills/still-01.jpg" },
  { href: "/films/askindan-olmemeli", title: "Aşkından Ölmemelİ", src: "/projects/askindan-olmemeli/stills/still-01.jpg" },
  { href: "/films/voice-of-the-earth", title: "Voice of the Earth", src: "/projects/voice-of-the-earth/stills/still-01.jpg" },
  { href: "/films/kuzaya", title: "Kuzaya", src: "/projects/kuzaya/stills/still-04.jpg" },
  { href: "/films/from-ashes", title: "From Ashes I", src: "/projects/from-ashes-i/stills/still-10.jpg" },
  { href: "/films/internet-rounds", title: "Internet Rounds", src: "/projects/internet-rounds/stills/still-01.jpg" },
  { href: "/films/empower", title: "Empower", src: "/projects/empower/stills/still-04.jpg" },
  { href: "/films/bon-aime", title: "Bon Aimé", src: "/projects/bon-aime/stills/still-02.jpg" },
  { href: "/films/proteen", title: "Proteen", src: "/projects/proteen/stills/still-09.jpg" },
  { href: "/films/worldview-seaweed", title: "Worldview Seaweed", src: "/projects/worldview-seaweed/stills/still-03.jpg" },
  { href: "/films/from-ashes-ii", title: "From Ashes II", src: "/projects/from-ashes-ii/stills/still-07.jpg" },
  { href: "/films/green-refuge", title: "Green Refuge", src: "/projects/green-refuge/stills/still-08.jpg" },
  { href: "/films/askindan-olmemeli", title: "Aşkından Ölmemelİ", src: "/projects/askindan-olmemeli/stills/still-04.jpg" },
  { href: "/films/kuzaya", title: "Kuzaya", src: "/projects/kuzaya/stills/still-10.jpg" },
  { href: "/films/voice-of-the-earth", title: "Voice of the Earth", src: "/projects/voice-of-the-earth/stills/still-04.jpg" },
  { href: "/films/from-ashes", title: "From Ashes I", src: "/projects/from-ashes-i/stills/still-13.jpg" },
  { href: "/films/internet-rounds", title: "Internet Rounds", src: "/projects/internet-rounds/stills/still-07.jpg" },
];

function isDocumentary(film: Project) {
  const label = film.formatLabel?.toLowerCase() ?? "";
  return (
    !label.includes("branded") &&
    !label.includes("music") &&
    !label.includes("commercial") &&
    !label.includes("biopic")
  );
}

function ToTop() {
  const reduceMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const footer = document.querySelector(".home-editorial__foot");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOpen(entry.isIntersecting),
      { threshold: 0.6 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      className={`home-editorial__up${open ? " is-open" : ""}`}
      aria-label="Back to top"
      aria-hidden={open ? undefined : true}
      tabIndex={open ? 0 : -1}
      data-interactive
      onClick={() => scrollPageToTop(reduceMotion)}
    >
      <span aria-hidden>↑</span>
    </button>
  );
}

function FrameStrip({ reduceMotion }: { reduceMotion: boolean }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const dragging = useRef(false);
  const dragDistance = useRef(0);
  const inertia = useRef(0);
  const holdAuto = useRef(0);
  const pointer = useRef({
    x: 0,
    y: 0,
    t: 0,
    horizontal: false,
    decided: false,
  });
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let frame = 0;
    let last = performance.now();
    let onScreen = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(viewport);

    const onWheel = (event: WheelEvent) => {
      let dx = event.deltaX;
      let dy = event.deltaY;
      if (event.deltaMode === 1) {
        dx *= 16;
        dy *= 16;
      } else if (event.deltaMode === 2) {
        dx *= viewport.clientWidth;
        dy *= viewport.clientHeight;
      }
      const shift = event.shiftKey && Math.abs(dy) > Math.abs(dx);
      const delta = shift ? dy : dx;
      if (!shift && Math.abs(dx) <= Math.abs(dy)) return;
      if (Math.abs(delta) < 0.5) return;
      event.preventDefault();
      offsetRef.current -= delta;
      inertia.current = 0;
      holdAuto.current = performance.now() + 900;
    };
    viewport.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });

    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      const first = track.children[0] as HTMLElement | undefined;
      const mid = track.children[HOME_STILLS.length] as HTMLElement | undefined;
      const loop = first && mid ? mid.getBoundingClientRect().left - first.getBoundingClientRect().left : 0;
      const held = dragging.current || now < holdAuto.current;

      if (!held && onScreen) {
        if (Math.abs(inertia.current) > 0.02) {
          offsetRef.current += inertia.current * dt;
          inertia.current *= Math.exp(-dt / 180);
        } else if (!reduceMotion) {
          offsetRef.current -= 0.045 * dt;
        }
      }

      if (loop > 0) {
        while (offsetRef.current <= -loop) offsetRef.current += loop;
        while (offsetRef.current > 0) offsetRef.current -= loop;
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.removeEventListener("wheel", onWheel, { capture: true });
    };
  }, [reduceMotion]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    pointer.current = {
      x: event.clientX,
      y: event.clientY,
      t: performance.now(),
      horizontal: false,
      decided: false,
    };
    dragDistance.current = 0;
    inertia.current = 0;
    dragging.current = false;
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const start = pointer.current;
    if (!start.t) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (!start.decided) {
      if (Math.hypot(dx, dy) < 6) return;
      start.decided = true;
      start.horizontal = Math.abs(dx) > Math.abs(dy);
      if (!start.horizontal) {
        start.t = 0;
        return;
      }
      dragging.current = true;
      setGrabbing(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (!start.horizontal) return;
    const now = performance.now();
    const step = event.clientX - start.x;
    const elapsed = now - start.t;
    if (elapsed > 0) {
      const velocity = step / elapsed;
      inertia.current = Math.max(-1.4, Math.min(1.4, velocity));
    }
    dragDistance.current += Math.abs(step);
    offsetRef.current += step;
    start.x = event.clientX;
    start.t = now;
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragging.current = false;
    pointer.current.t = 0;
    setGrabbing(false);
  }

  return (
    <div
      ref={viewportRef}
      className={`home-frames__viewport${grabbing ? " is-grabbing" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div ref={trackRef} className="home-frames__track">
        {[false, true].map((clone) =>
          HOME_STILLS.map((still) => (
            <Link
              key={`${clone ? "clone" : "live"}-${still.src}`}
              href={still.href}
              className="home-frames__card"
              data-interactive
              draggable={false}
              tabIndex={clone ? -1 : undefined}
              aria-hidden={clone || undefined}
              onClick={(event) => {
                if (dragDistance.current > 8) {
                  event.preventDefault();
                  dragDistance.current = 0;
                }
              }}
            >
              <span className="home-frames__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...getImageProps({
                    src: still.src,
                    alt: "",
                    width: 1920,
                    height: 1080,
                    sizes: FRAME_SIZES,
                  }).props}
                  alt=""
                  draggable={false}
                  className={still.crop ? "is-letterbox" : undefined}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="home-frames__label">{still.title}</span>
            </Link>
          )),
        )}
      </div>
    </div>
  );
}

function minutesOf(project: Project) {
  const match = project.runtime?.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

const OPENER_SPOTS = [
  { left: "14%", top: "24%" },
  { left: "46%", top: "20%", transform: "translateX(-50%)" },
  { right: "13%", top: "30%" },
  { left: "20%", top: "46%" },
  { left: "56%", top: "52%", transform: "translateX(-50%)" },
  { left: "42%", top: "74%", transform: "translateX(-50%)" },
  { right: "21%", top: "42%" },
  { left: "12%", top: "66%" },
  { right: "11%", top: "68%" },
];

function openerLabel(title: string) {
  return title.replace(/:\s*$/, "");
}

function Opener({
  films,
  reduceMotion,
}: {
  films: Project[];
  reduceMotion: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);
  const tapToPreview = useMediaQuery("(max-width: 800px), ((hover: none) and (pointer: coarse))");
  const portraitHero = useMediaQuery("(max-width: 700px) and (max-aspect-ratio: 4/5)");
  const openerPoster = portraitHero
    ? "/projects/v4-cover-mobile-poster.jpg?v=1"
    : "/projects/v4-cover-poster.jpg?v=5";
  const openerVideo = portraitHero
    ? "/projects/v4-cover-mobile.mp4?v=2"
    : "/projects/v4-cover.mp4?v=7";
  // Only mount the video once the media query has been read on the client, so a
  // phone never starts fetching the wide cut.
  const videoReady = useHydrated();

  return (
    <div
      className="home-opener"
      onClick={(event) => {
        if (!tapToPreview) return;
        const target = event.target as HTMLElement;
        if (!target.closest(".home-opener__film")) setActive(null);
      }}
    >
      <div className="home-opener__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={openerPoster}
          alt=""
          width={portraitHero ? 720 : 1920}
          height={portraitHero ? 1556 : 1080}
        />
        {reduceMotion || !videoReady ? null : (
          <video
            key={openerVideo}
            src={openerVideo}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-hidden
          />
        )}
      </div>
      {films.slice(0, OPENER_SPOTS.length).map((film) => (
        <div
          key={film.id}
          className={`home-opener__cover${active === film.id ? " is-on" : ""}`}
          data-film={film.id}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...getImageProps({
              src: film.media.poster ?? film.media.src,
              alt: "",
              width: 1920,
              height: 1080,
              quality: 85,
              sizes: "100vw",
            }).props}
            alt=""
          />
        </div>
      ))}
      <div className="home-opener__shade" aria-hidden />
      <header className="home-opener__nav">
        <Link href="/" data-interactive>
          <span aria-hidden>/</span>
          {site.legalName}
        </Link>
        <a href="#films" data-interactive>
          <span aria-hidden>/</span>
          Films
        </a>
        <Link href="/studio" data-interactive>
          <span aria-hidden>/</span>
          Studio
        </Link>
        <Link href="/contact" data-interactive>
          <span aria-hidden>/</span>
          Contact
        </Link>
      </header>
      <h1 className="home-opener__sr">{site.legalName}</h1>
      <div className="home-opener__films" onMouseLeave={() => {
        if (!tapToPreview) setActive(null);
      }}>
        {films.slice(0, OPENER_SPOTS.length).map((film, index) => (
          <Link
            key={film.id}
            href={film.href ?? projectPath(film.id)}
            className={`home-opener__film${tapToPreview && active === film.id ? " is-picked" : ""}`}
            style={OPENER_SPOTS[index]}
            data-interactive
            onMouseEnter={() => {
              if (!tapToPreview) setActive(film.id);
            }}
            onFocus={() => {
              if (!tapToPreview) setActive(film.id);
            }}
            onBlur={() => {
              if (!tapToPreview) setActive(null);
            }}
            onClick={(event) => {
              if (!tapToPreview || active === film.id) return;
              event.preventDefault();
              setActive(film.id);
            }}
          >
            <span>{openerLabel(film.title)}</span>
            <span>See project</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const ARCHIVE_ORDER = [
  "from-ashes",
  "from-ashes-ii",
  "green-refuge",
  "bon-aime",
  "kuzaya",
  "empower",
  "worldview-seaweed",
  "proteen",
  "entrepreneurs-of-the-northeast",
  "ecocide-law",
  "time-ritual",
  "kalpte-yasamak",
  "mark-rubin",
  "internet-rounds",
  "nanu",
  "meshk",
  "dynex",
  "ebc",
  "dynex-apollo",
  "the-vision-walk",
  "united-planet",
  "clara-hygienics",
  "cosmogenesis-universe",
  "conscious-technology",
  "world-bank-icha",
  "nyc-climate-week",
  "voice-of-the-earth",
  "askindan-olmemeli",
  "adamlar",
];

function orderedArchive(films: Project[]) {
  const rank = (film: Project) => {
    const index = ARCHIVE_ORDER.indexOf(film.id);
    return index === -1 ? ARCHIVE_ORDER.length : index;
  };
  const year = (film: Project) => {
    const matches = yearOf(film).match(/\d{4}/g);
    const value = Number(matches?.[matches.length - 1]);
    return Number.isFinite(value) ? value : 0;
  };
  return [...films].sort((a, b) => year(b) - year(a) || rank(a) - rank(b));
}

// Info panel opened by clicking a film row: log-line, director credit and a link.
function TapInfo({ film }: { film: Project }) {
  const detail = getProjectDetail(film.id);
  const logline = detail?.synopsis[0] ?? film.description;
  // Director, Director–Editor, Co-director… but not Director of Photography.
  const directors =
    detail?.credits.filter((credit) => /director/i.test(credit.label) && !/photography/i.test(credit.label)) ?? [];
  const meta = [yearOf(film), archiveKind(film), film.country, film.runtime].filter(Boolean).join(" · ");

  return (
    <div className="home-archive__tap">
      <div className="home-archive__tap-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...getImageProps({
            src: film.media.poster ?? film.media.src,
            alt: "",
            width: 1280,
            height: 720,
            sizes: "(max-width: 800px) 100vw, 28rem",
          }).props}
          alt=""
        />
      </div>
      <div className="home-archive__tap-body">
        {logline ? (
          <p className="home-archive__tap-logline">
            <DottedTurkiyeText text={logline} />
          </p>
        ) : null}
        <dl className="home-archive__tap-meta">
          {directors.map((credit) => (
            <div key={credit.label}>
              <dt>{credit.label}</dt>
              <dd>
                <DottedTurkiyeText text={credit.value} />
              </dd>
            </div>
          ))}
          <div>
            <dt>Details</dt>
            <dd>
              <DottedTurkiyeText text={meta} />
            </dd>
          </div>
        </dl>
        <div className="home-archive__tap-go">
          <Link href={film.href ?? projectPath(film.id)} data-interactive>
            See project <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArchiveList({ films }: { films: Project[] }) {
  const [filter, setFilter] = useState<"ALL" | ArchiveKind>("ALL");
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  // The panel that is animating shut; it stays mounted until its close animation ends.
  const [closingId, setClosingId] = useState<string | null>(null);
  const ordered = orderedArchive(films);
  const visible = filter === "ALL" ? ordered : ordered.filter((film) => archiveKind(film) === filter);

  return (
    <div className="home-archive">
      <div className="home-archive__top">
        <h2>Films</h2>
        <div className="home-archive__filters" role="group" aria-label="Filter the archive">
          <button
            type="button"
            data-interactive
            aria-pressed={filter === "ALL"}
            onClick={() => {
              setFilter("ALL");
              setExpanded(false);
              setActiveId(null);
              setClosingId(null);
            }}
          >
            All
          </button>
          {ARCHIVE_KINDS.map((kind) => (
            <button
              key={kind}
              type="button"
              data-interactive
              aria-pressed={filter === kind}
              onClick={() => {
                setFilter(kind);
                setExpanded(false);
                setActiveId(null);
                setClosingId(null);
              }}
            >
              {kind}
            </button>
          ))}
        </div>
      </div>
      <ul className={`home-archive__list${expanded ? " is-open" : ""}`}>
        {visible.map((film) => (
          <li key={film.id}>
            <Link
              href={film.href ?? projectPath(film.id)}
              className="home-archive__row"
              data-interactive
              data-active={film.id === activeId ? "true" : "false"}
              aria-expanded={film.id === activeId}
              onClick={(event) => {
                // First click opens the info panel; the panel's "See project" link navigates.
                event.preventDefault();
                setClosingId(activeId);
                setActiveId(activeId === film.id ? null : film.id);
              }}
            >
              <span className="home-archive__title">
                {film.id === "ebc" ? "European Blockchain Convention" : openerLabel(film.title)}
              </span>
              <span>{yearOf(film)}</span>
              <span>{archiveKind(film)}</span>
              <span className="home-archive__country">
                {film.country ? <DottedTurkiyeText text={film.country} /> : null}
              </span>
              <span>{film.runtime}</span>
            </Link>
            {activeId === film.id || closingId === film.id ? (
              <div
                className={`home-archive__tap-wrap${activeId === film.id ? "" : " is-closing"}`}
                onAnimationEnd={(event) => {
                  if (event.target === event.currentTarget && activeId !== film.id) setClosingId(null);
                }}
              >
                <div className="home-archive__tap-clip">
                  <TapInfo film={film} />
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      {visible.length > 10 ? (
        <button
          type="button"
          className="home-archive__more"
          data-interactive
          onClick={() => setExpanded(true)}
        >
          See more <span aria-hidden>→</span>
        </button>
      ) : null}
    </div>
  );
}

export function HomeEditorialOpen({ films }: HomeEditorialOpenProps) {
  const reduceMotion = usePrefersReducedMotion();
  const documentaries = films.filter(isDocumentary);
  const featured = documentaries.filter((film) => minutesOf(film) > FEATURED_MINUTES);
  const byId = (id: string) => films.find((film) => film.id === id);

  return (
    <section
      className={`home-editorial${reduceMotion ? " is-still" : ""}`}
      aria-label="Studio cover"
    >
      <Opener
        films={[
          ...featured.filter((film) => film.id !== "from-ashes-ii"),
          ...["worldview-seaweed", "ebc", "internet-rounds", "voice-of-the-earth", "askindan-olmemeli"]
            .map(byId)
            .filter((film): film is Project => Boolean(film)),
        ]}
        reduceMotion={reduceMotion}
      />

      <div className="home-editorial__split">
        <div className="home-editorial__statement">
          <p className="home-editorial__kicker">Independent & commissioned films</p>
          <p className="home-editorial__line">An exploration of narrative.</p>
          <p className="home-editorial__body">{site.description}</p>
          <Link href="/studio" className="home-editorial__meet" data-interactive>
            Meet GEZ Studio <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <section className="home-editorial__catalog" id="films" aria-label="Films">
        <ArchiveList films={films} />
      </section>

      <section className="home-editorial__frames" aria-label="Stills">
        <div className="home-frames__head">
          <p>Frames from the films</p>
        </div>
        <FrameStrip reduceMotion={reduceMotion} />
      </section>

      <section className="home-editorial__close" aria-label="Contact">
        <div className="home-editorial__actions">
          <Link href="/contact" data-interactive>
            Start a conversation <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <footer className="home-editorial__foot">
        <nav aria-label="Social">
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" data-interactive>
            Instagram
          </a>
          <a href={site.social.vimeo} target="_blank" rel="noopener noreferrer" data-interactive>
            Vimeo
          </a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" data-interactive>
            LinkedIn
          </a>
        </nav>
        <a href={`mailto:${site.contact.email}`} data-interactive>
          {site.contact.email}
        </a>
        <p className="home-editorial__foot-meta">
          <span>
            © {new Date().getFullYear()} {site.company.name}
          </span>
          <span>{site.company.address}</span>
          <span>Company No. {site.company.number}</span>
        </p>
      </footer>
      <ToTop />
    </section>
  );
}
