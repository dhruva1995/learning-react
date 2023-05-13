import Section from "../UI/Section";
import useHttp from "../hooks/use-http";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const {
    isLoading,
    error,
    dispatchRequest: createRequestDispatcher,
  } = useHttp();
  const onResponse = (taskText, response) => {
    const generatedId = response.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };
  const enterTaskHandler = async (taskText) => {
    createRequestDispatcher(
      {
        url: "https://react-http-5845d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      onResponse.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
