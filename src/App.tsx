import HeroSection from "./sections/HeroSection";
import TableOfContents from "./sections/TableOfContents.ts";
import About from "./sections/About";
import Timeline from "./sections/Timeline";
import CodeBlock from "./components/CodeBlock";

const orgListCardSnippet = `export interface InterfaceOrgListCardProps {
  data: InterfaceOrgConnectionInfoType;
}

function OrgListCard(props: InterfaceOrgListCardProps): JSX.Element {
  const { _id, admins, image, location, members, name } = props.data;
  const history = useHistory();

  function handleClick(): void {
    history.push('/orgdash/id=' + _id);
  }
  // ...
}`;

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7 border-start border-end">
            <HeroSection />
            <TableOfContents />
            <About />
            <Timeline />
            <div id="code" className="pb-5">
              <h2 className="fs-3 mb-2">OrgListCard</h2>
              <p className="text-secondary mb-3">
                PR #950 replaced the separate <code>AdminDashListCard</code>{" "}
                and <code>SuperDashListCard</code> components with a single{" "}
                <code>OrgListCard</code>, reused across the admin and
                super-admin views instead of duplicated per role.
              </p>
              <CodeBlock
                fileName="src/components/OrgListCard/OrgListCard.tsx"
                text={orgListCardSnippet}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
