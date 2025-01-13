import { useCollection } from "../hooks/useCollection";
function About() {
  useCollection("images")
  return <div>About</div>;
}

export default About;
