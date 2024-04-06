export const EventListRow = ({ event }) => {
  return (
    <>
      <div>
        <div>
          <div class="Vector-4"></div>
        </div>
        <div>
          <div>{event.title}</div>
          <div>{event.content}</div>
        </div>
      </div>
    </>
  );
};

export default EventListRow;
