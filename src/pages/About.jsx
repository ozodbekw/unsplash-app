// firebase imports
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// import hooks
import { useCollection } from "../hooks/useCollection";

function About() {
  const deleteDocFromCollection = (id) => {
    deleteDoc(doc(db, "images", id))
      .then(() => console.log("OK "))
      .catch((error) => console.log("Error", error.message));
  };
  const { data } = useCollection("images");
  return (
    <div className="align-elements">
      {data &&
        data.map((todo) => {
          return (
            <div key={todo.id} className="card">
              <div className="mb-5 border card-body">
                <h1 className="text-2xl font-medium">{todo.title}</h1>
                <p>{todo.describtion}</p>
                <div className="flex gap-4">
                  <button className="self-start btn-primary btn">
                    {todo.completed ? "Completed" : "Uncompleted"}
                  </button>
                  <button
                    onClick={() => deleteDocFromCollection(todo.id)}
                    className="self-start btn-secondary btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default About;
