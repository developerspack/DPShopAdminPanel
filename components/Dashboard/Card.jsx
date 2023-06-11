import PropTypes from "prop-types";

const Card = ({ Name, No, icon }) => {
  const today = new Date().toLocaleDateString();

  return (
    <div className="rounded-lg bg-dark p-4 flex justify-between">
      <div className="space-y-3">
        <h2 className="font-bold tracking-wide text-2xl text-primary">
          {Name}
        </h2>
        <p className="font-bold text-2xl text-gray-400">{No}</p>
        <p className="text-xl font-semibold italic text-gray-500">{today}</p>
      </div>
      <div className="items-center flex">{icon}</div>
    </div>
  );
};
Card.propTypes = {
  icon: PropTypes.element.isRequired,
  Name: PropTypes.string.isRequired,
  No: PropTypes.string.isRequired,
};
export default Card;
