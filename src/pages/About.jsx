import { useCollection } from "../hooks/useCollection";
function About() {
  const { data } = useCollection("images");
  console.log(data);
  return (
    <div className="align-elements">
      {data &&
        data.map((todo) => {
          return (
            <div key={todo.id} className="card">
              <div className="mb-5 border card-body">
                <h1 className="text-2xl font-medium">{todo.title}</h1>
                <p>{todo.describtion}</p>
                <button className="self-start btn-primary btn">
                  {todo.completed ? "Completed" : "Uncompleted"}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default About;
