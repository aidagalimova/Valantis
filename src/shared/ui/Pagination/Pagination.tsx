import { ArrowLeft, ArrowRight } from "shared/assets/icons/icons";
import "./Pagination.scss";
import { ReactNode } from "react";

interface PaginationProps {
  isLeft: boolean;
  isRight: boolean;
  children: ReactNode;
  onRight: () => void;
  onLeft: () => void;
}
const Pagination = (props: PaginationProps) => {
  const { isLeft, isRight, onLeft, onRight, children } = props;
  const PaginationEl = (
    <>
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
    </>
  );
  return (
    <div className="Pagination">
      <div className="topPagination">{PaginationEl}</div>
      {children}
      <div className="bottomPagination">{PaginationEl}</div>
    </div>
  );
};

export default Pagination;
