import { ArrowLeft, ArrowRight } from "shared/assets/icons/icons";
import "./Pagination.scss";

interface PaginationProps {
  isLeft: boolean;
  isRight: boolean;
  onRight: () => void;
  onLeft: () => void;
}
const Pagination = (props: PaginationProps) => {
  const { isLeft, isRight, onLeft, onRight } = props;
  return (
    <div className="Pagination">
      {isLeft ? (
        <div className="moveBtn" onClick={onLeft}>
          <div>
            <ArrowLeft />
          </div>
          <div>Предыдущая страница</div>
        </div>
      ) : (
        <div className="moveBtn disabled">
          <div>
            <ArrowLeft />
          </div>
          <div>Предыдущая страница</div>
        </div>
      )}
      {isRight ? (
        <div className="moveBtn" onClick={onRight}>
          <div>Следующая страница</div>
          <div>
            <ArrowRight />
          </div>
        </div>
      ) : (
        <div className="moveBtn disabled">
          <div>Следующая страница</div>
          <div>
            <ArrowRight />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
