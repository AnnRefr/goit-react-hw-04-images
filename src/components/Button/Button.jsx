import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ handleLoadMore }) => {
  return (
    <button type="button" className={css.btn} onClick={handleLoadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
