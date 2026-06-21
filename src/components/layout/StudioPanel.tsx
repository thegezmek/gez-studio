"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  collaborators,
  featuredCollaborators,
  type CollaboratorLogo,
} from "@/data/collaborators";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { site, team } from "@/data/site";

interface StudioPanelProps {
  onClose: () => void;
}

function CollaboratorLogoLink({ logo }: { logo: CollaboratorLogo }) {
  return (
    <a
      href={logo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="studio-panel__collaborator"
      data-slug={logo.slug}
      aria-label={`${logo.name} (opens in new tab)`}
      data-interactive
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt=""
        className="studio-panel__collaborator-logo"
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

function CollaboratorNavArrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      className="studio-panel__collaborators-nav-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "prev" ? (
        <path d="M14 6l-6 6 6 6" />
      ) : (
        <path d="M10 6l6 6-6 6" />
      )}
    </svg>
  );
}

function CollaboratorSlider({
  logos,
  label,
}: {
  logos: CollaboratorLogo[];
  label: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dragMovedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const loopLogos = (reduceMotion ? logos : [...logos, ...logos]).map(
    (logo, index) => ({
      logo,
      key: reduceMotion ? logo.slug : `${logo.slug}-${index}`,
    }),
  );

  const normalizeScroll = useCallback((viewport: HTMLDivElement) => {
    const half = viewport.scrollWidth / 2;
    if (half <= 0) return;

    if (viewport.scrollLeft >= half) {
      viewport.scrollLeft -= half;
    } else if (viewport.scrollLeft < 0) {
      viewport.scrollLeft += half;
    }
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let frame = 0;
    const scrollSpeed = 0.65;

    const tick = () => {
      if (!reduceMotion && !isDraggingRef.current && !isHoveredRef.current) {
        viewport.scrollLeft += scrollSpeed;
        normalizeScroll(viewport);
      }

      const viewportRect = viewport.getBoundingClientRect();
      const edgeZone = Math.max(56, viewportRect.width * 0.14);

      viewport
        .querySelectorAll<HTMLElement>(".studio-panel__collaborator-item")
        .forEach((item) => {
          const rect = item.getBoundingClientRect();
          const centerX = (rect.left + rect.right) * 0.5;
          const distEdge = Math.min(
            centerX - viewportRect.left,
            viewportRect.right - centerX,
          );
          const edgeAmount = Math.max(0, Math.min(1, 1 - distEdge / edgeZone));

          if (edgeAmount > 0.02) {
            const blur = edgeAmount * 5;
            const opacity = 0.42 + (1 - edgeAmount) * 0.58;
            item.style.filter = `blur(${blur.toFixed(2)}px)`;
            item.style.opacity = opacity.toFixed(2);
          } else {
            item.style.filter = "";
            item.style.opacity = "";
          }
        });

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [logos, normalizeScroll, reduceMotion]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || event.button !== 0) return;

    isDraggingRef.current = true;
    dragMovedRef.current = false;
    pointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    scrollStartRef.current = viewport.scrollLeft;
    setIsGrabbing(true);
    viewport.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || pointerIdRef.current !== event.pointerId) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const delta = event.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 4) dragMovedRef.current = true;

    viewport.scrollLeft = scrollStartRef.current - delta;
    normalizeScroll(viewport);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    isDraggingRef.current = false;
    pointerIdRef.current = null;
    setIsGrabbing(false);
    isHoveredRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragMovedRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    dragMovedRef.current = false;
  };

  return (
    <div className="studio-panel__collaborators-marquee" aria-label={label} role="region">
      <span className="studio-panel__collaborators-hint" aria-hidden>
        <CollaboratorNavArrow direction="prev" />
      </span>

      <div
        ref={viewportRef}
        className={`studio-panel__collaborators-marquee-viewport${isGrabbing ? " is-grabbing" : ""}`}
        onPointerEnter={() => {
          isHoveredRef.current = true;
        }}
        onPointerLeave={() => {
          if (!isDraggingRef.current) isHoveredRef.current = false;
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <ul className="studio-panel__collaborators-track">
          {loopLogos.map(({ logo, key }) => (
            <li key={key} className="studio-panel__collaborator-item">
              <CollaboratorLogoLink logo={logo} />
            </li>
          ))}
        </ul>
      </div>

      <span className="studio-panel__collaborators-hint" aria-hidden>
        <CollaboratorNavArrow direction="next" />
      </span>
    </div>
  );
}

function CollaboratorGrid({
  logos,
  label,
}: {
  logos: CollaboratorLogo[];
  label: string;
}) {
  return (
    <ul
      className="studio-panel__collaborators-grid"
      aria-label={label}
    >
      {logos.map((logo) => (
        <li key={logo.slug}>
          <CollaboratorLogoLink logo={logo} />
        </li>
      ))}
    </ul>
  );
}

export function StudioPanel({ onClose }: StudioPanelProps) {
  const { studio } = site;

  return (
    <motion.aside
      className="panel-surface studio-panel fixed inset-0 z-[100] flex flex-col backdrop-blur-md"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      role="dialog"
      aria-label="Studio"
    >
      <div className="panel-scroll flex-1 px-5 py-24 md:px-12 md:py-28">
        <div className="studio-panel__inner mx-auto max-w-3xl">
          <button
            type="button"
            data-interactive
            onClick={onClose}
            className="btn-stroke type-index mb-16 text-dim"
          >
            Close
          </button>

          <h2 className="studio-panel__title text-4xl font-medium leading-tight tracking-[-0.03em] text-bright md:text-6xl">
            {studio.title}
          </h2>

          <div className="studio-panel__intro mt-8 space-y-5 text-sm leading-relaxed text-dim md:text-base">
            {studio.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <section className="studio-panel__section mt-16 border-t border-steel/50 pt-12">
            <p className="type-index mb-8">{studio.founder.label}</p>
            <div className="space-y-5 text-sm leading-relaxed text-dim md:text-base">
              {studio.founder.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="studio-panel__section mt-16 border-t border-steel/50 pt-12">
            <p className="type-index mb-6">{studio.team.label}</p>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-dim md:text-base">
              {studio.team.description}
            </p>
            <ul className="studio-panel__team-grid">
              {team.map((member) => {
                const photo = (
                  <span className="studio-panel__team-photo">
                    <Image
                      src={member.photo}
                      alt=""
                      width={240}
                      height={240}
                      className="studio-panel__team-photo-img"
                      sizes="120px"
                    />
                  </span>
                );

                return (
                <li
                  key={member.name}
                  className={`studio-panel__team-member${member.photo.includes("ilker-yurtcan") ? " studio-panel__team-member--ilker" : ""}`}
                >
                  {"url" in member && member.url ? (
                    <a
                      href={member.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-panel__team-photo-link"
                      aria-label={`${member.name} — ${member.role} (opens in new tab)`}
                      data-interactive
                      data-cursor-play
                    >
                      {photo}
                    </a>
                  ) : (
                    <span className="studio-panel__team-photo-link">{photo}</span>
                  )}
                  <div className="studio-panel__team-copy">
                    <span className="studio-panel__team-name">{member.name}</span>
                    <span className="studio-panel__team-role type-category">
                      {member.role}
                    </span>
                  </div>
                </li>
                );
              })}
            </ul>
          </section>

          <section className="studio-panel__section mt-16 border-t border-steel/50 pt-12">
            <p className="type-index mb-6">{studio.production.label}</p>
            <ul className="studio-panel__list space-y-3">
              {studio.production.items.map((item) => (
                <li key={item} className="text-sm text-dim md:text-base">
                  — {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="studio-panel__section mt-16 border-t border-steel/50 pt-12">
            <p className="type-index mb-6">{studio.collaborators.label}</p>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-dim md:text-base">
              {studio.collaborators.description}
            </p>
            <div className="studio-panel__collaborators">
              <div className="studio-panel__collaborators-featured">
                <CollaboratorSlider
                  logos={featuredCollaborators}
                  label="Primary collaborators"
                />
              </div>
              <div className="studio-panel__collaborators-rest">
                <CollaboratorGrid
                  logos={collaborators}
                  label="Additional collaborators"
                />
              </div>
            </div>
          </section>

          <nav className="studio-panel__social" aria-label="Social links">
            <Link
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="type-index site-footer__link"
              data-interactive
            >
              Instagram
            </Link>
            <Link
              href={site.social.vimeo}
              target="_blank"
              rel="noopener noreferrer"
              className="type-index site-footer__link"
              data-interactive
            >
              Vimeo
            </Link>
            <Link
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="type-index site-footer__link"
              data-interactive
            >
              LinkedIn
            </Link>
          </nav>
        </div>
      </div>
    </motion.aside>
  );
}
