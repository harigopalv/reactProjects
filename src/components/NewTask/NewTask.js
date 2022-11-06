import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useFetch from "../../hooks/use-Fetch";

const NewTask = (props) => {
  const enterTaskHandler = (taskText) => {
    enterFetchHandler(
      {
        url: "https://new-http-f0516-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        header: {
          "Content-Type": "application/json",
        },
      },
      (data) => {
        const generatedId = data.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };
        props.onAddTask(createdTask);
      }
    );
  };

  const { isLoading, error, sendRequest: enterFetchHandler } = useFetch();
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
