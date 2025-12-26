import { useParams } from "react-router-dom";
import { topics } from "../data/parsedData";
import Container from "../components/container";

const ImportantQuestions = () => {
  const { topicId } = useParams();
  const topic = topics.find((t) => t.id === topicId);

  return (
    <Container>
      <h2 className="text-2xl font-bold mb-4">Important Questions</h2>

      <ul className="list-disc pl-6 space-y-2">
        {topic.importantQuestions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    </Container>
  );
};

export default ImportantQuestions;
