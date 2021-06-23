import './PokeLoader.css';
import pokeball from './pokeball.svg'

const PokeLoader = (props) => {
  return (
    <div className="modal" style={{"display":props.display}}>
      <div className="modal-content">
        <h2>Loading...</h2>
        <img src={pokeball} alt="Loader" width="50px" height="50px"/>
      </div>
    </div>
  );
};

export default PokeLoader;