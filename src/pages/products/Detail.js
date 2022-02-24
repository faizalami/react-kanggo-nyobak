import { useParams } from 'react-router-dom';

export default function Details () {
  const params = useParams();
  return (
    <div>
      Detail {params.id}
    </div>
  );
}
