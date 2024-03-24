const TAB_DATA = [
  {
    title: "Skills",
    id: "Skills",
    content: (
      <ul className="list-disc pl-2">
        <li>HTML,CSS,JavaScript,TypeScript</li>
        <li>React,NextJS,TailWindCSS</li>
        <li>Express,NodeJS</li>
        <li>Prisma,MongoDB,MySQL</li>
        <li>Agile</li>
      </ul>
    ),
  },
  {
    title: "Educations",
    id: "Educations",
    content: (
      <ul className="list-disc pl-2">
        <li>
          <a
            href="/PDFs/UniMel.pdf"
            rel="University Melbourne "
            className="transition-colors duration-300 hover:text-blue-500">
            University Melbourne (Master of Information Technology)
          </a>
        </li>
        <li>
          <a
            href="/PDFs/Monash.pdf"
            rel="monash "
            className="transition-colors duration-300 hover:text-blue-500">
            Monash University (Bachelor of Computer Science in Data Science)
          </a>
        </li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "Certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>
          <a
            href="/PDFs/ITIL.pdf"
            rel="University Melbourne"
            className="transition-colors duration-300 hover:text-blue-500">
            ITIL
          </a>
        </li>
        <li>
          <a
            href="/PDFs/PMP.pdf"
            rel="University Melbourne "
            className="transition-colors duration-300 hover:text-blue-500">
            PMP
          </a>
        </li>
        <li>
          <a
            href="/PDFs/AWS.pdf"
            rel="University Melbourne "
            className="transition-colors duration-300 hover:text-blue-500">
            AWS Cloud Practitioner
          </a>
        </li>
        <li>
          <a
            href="/PDFs/Microsoft.pdf"
            rel="University Melbourne "
            className="transition-colors duration-300 hover:text-blue-500">
            Microsoft 2019
          </a>
        </li>
      </ul>
    ),
  },
];
export default TAB_DATA;
