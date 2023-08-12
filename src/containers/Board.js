import KanbanCard  from '../components/KanbanCard'
export default function Board(props) {
    return (
        <div>
    <div className="kanban-board">
      {sortedGroups.map(({ groupKey, items }) => (
        <div className="kanban-column" key={groupKey}>
          <h2>{groupKey}</h2>
          {items.map(item => (
            <KanbanCard key={item.id} cardData={item} />
          ))}
        </div>
      ))}
    </div>
  </div>
    )
} 