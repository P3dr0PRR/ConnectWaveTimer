type StatusType = 'concluido' | 'interrompido' | 'em andamento';
type StatusColor = 'bg-green-500' | 'bg-red-500' | 'bg-yellow-500';

type StatusProps = {
  status: StatusType;
};

const statusSituation = (
  status: 'concluido' | 'interrompido' | 'em andamento'
): StatusColor => {
  if (status === 'concluido') {
    return 'bg-green-500';
  }
  if (status === 'interrompido') {
    return 'bg-red-500';
  }
  return 'bg-yellow-500';
};

const Status = (props: StatusProps) => {
  const color = statusSituation(props.status);
  return (
    <div
      className={[
        "flex gap-2 items-center before:content-[''] before:w-2 before:h-2 before:rounded-full",
        color === 'bg-green-500' && 'before:bg-green-500',
        color === 'bg-red-500' && 'before:bg-red-500',
        color === 'bg-yellow-500' && 'before:bg-yellow-500',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span>
        {props.status === 'concluido'
          ? 'Finalizado'
          : props.status === 'interrompido'
            ? 'Interrompido'
            : 'Em andamento'}
      </span>
    </div>
  );
};

export function History() {
  return (
    <section className="text-white w-full">
      <h1 className="text-2xl font-bold mb-4">Meu Histórico</h1>

      <div className="hidden md:block mt-6 rounded-lg overflow-hidden border-2 border-emerald-500 p-2">
        <table className="w-full text-left border-collapse ">
         <thead className="bg-gray-800 border-b border-gray-600">
            <tr>
              <th scope="col">Tarefa</th>
              <th scope="col">Duração</th>
              <th scope="col">Início</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
        <tbody className="bg-gray-700 border-t border-gray-600">
            <tr>
              <td>tarefa</td>
              <td>25 minutos</td>
              <td>25 minutos</td>
              <td>
                <Status status="concluido" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul className="md:hidden">
        <li className="overflow-hidden rounded-lg space-y-2 border-2 border-emerald-500">
          <div className="bg-gray-700 p-2 font-semibold flex justify-between">
            <span>Tarefa</span>
            <span>tarefa</span>
          </div>
          <div className="bg-gray-700 p-2 font-semibold flex justify-between">
            <span>Duração</span>
            <span>25 minutos</span>
          </div>
          <div className="bg-gray-700 p-2 font-semibold flex justify-between">
            <span>Início</span>
            <span>Há 2 meses</span>
          </div>
          <div className="bg-gray-700 p-2 font-semibold flex justify-between">
            <span>Status</span>
            <Status status="concluido" />
          </div>
        </li>
      </ul>
    </section>
  );
}