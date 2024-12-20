import { Link } from "react-router-dom";

const tags: string[] = ["Ideas", "Education", "Design", "Development", "Branding"];
const Tag = () => {
   return (
      <div className="keyword bg-white bg-wrapper">
         <h5 className="mb-20">Keywords</h5>
         <ul className="style-none d-flex flex-wrap">
            {tags.map((tag, i) => <li key={i}><Link to="#">{tag}</Link></li>)}
         </ul>
      </div>
   )
}

export default Tag
