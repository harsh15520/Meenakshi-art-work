import type { ReactNode } from "react";
import Image from "next/image";
import type { ReportBlock } from "@/data/curriculumReportContent";

// The source reports were generated with literal "**word**" markdown rather
// than real formatting — this turns that (and only that) into <strong>,
// nothing fancier. Not a general markdown parser on purpose.
function parseInline(text: string): ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function Block({ block }: { block: ReportBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <div className="report-heading">
          {block.label && <span className="report-heading__label">{block.label}</span>}
          <h3 className="report-heading__text">{block.text}</h3>
        </div>
      );

    case "paragraph":
      return <p className="report-p">{parseInline(block.text)}</p>;

    case "quote":
      return (
        <blockquote className="report-quote">
          <p>{parseInline(block.text)}</p>
          {block.attribution && <cite className="report-quote__attr">{block.attribution}</cite>}
        </blockquote>
      );

    case "callout":
      return (
        <aside className="report-callout">
          <p className="report-callout__label">{block.label}</p>
          <p className="report-callout__text">{parseInline(block.text)}</p>
        </aside>
      );

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag className="report-list">
          {block.items.map((item, i) => (
            <li key={i}>{parseInline(item)}</li>
          ))}
        </ListTag>
      );
    }

    case "groupedList":
      return (
        <div className="report-grouped">
          {block.groups.map((group, i) => (
            <div className="report-grouped__group" key={i}>
              <p className="report-grouped__label">{group.label}</p>
              <ul className="report-list">
                {group.items.map((item, j) => (
                  <li key={j}>{parseInline(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "qa":
      return (
        <ol className="report-qa">
          {block.items.map((item, i) => (
            <li key={i} className="report-qa__item">
              <p className="report-qa__q">{parseInline(item.q)}</p>
              {item.a && <p className="report-qa__a">{parseInline(item.a)}</p>}
              {item.note && <p className="report-qa__note">{parseInline(item.note)}</p>}
            </li>
          ))}
        </ol>
      );

    case "glossary":
      return (
        <dl className="report-glossary">
          {block.items.map((item, i) => (
            <div className="report-glossary__row" key={i}>
              <dt className="report-glossary__term">{item.term}</dt>
              <dd className="report-glossary__def">{parseInline(item.def)}</dd>
            </div>
          ))}
        </dl>
      );

    case "image":
      return (
        <figure className="report-image">
          <div className="report-image__frame">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(max-width:860px) 100vw, 40vw"
              className="report-image__img"
            />
          </div>
          <figcaption className="report-image__caption">{block.caption}</figcaption>
        </figure>
      );

    case "table":
      return (
        <div className="report-table-wrap">
          <table className="report-table">
            <thead>
              <tr>
                <th>{block.headers[0]}</th>
                <th>{block.headers[1]}</th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  <td>{parseInline(row[0])}</td>
                  <td>{parseInline(row[1])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

export default function ReportContent({ blocks }: { blocks: ReportBlock[] }) {
  return (
    <div className="report-content">
      {blocks.map((block, i) => (
        <Block block={block} key={i} />
      ))}
    </div>
  );
}
