import { site } from "@/data/site";

export function FeatureFilmsStatement() {
  const { title, lead } = site.featureFilms;

  return (
    <section
      className="archive-statement archive-statement--feature-films"
      aria-labelledby="feature-films-title"
    >
      <div className="archive-statement__inner">
        <div className="archive-statement__row">
          <h2
            id="feature-films-title"
            className="archive-statement__title"
          >
            {title}
          </h2>
          <p className="archive-statement__lead archive-statement__lead--wrap">
            {lead}
          </p>
        </div>
      </div>
    </section>
  );
}
