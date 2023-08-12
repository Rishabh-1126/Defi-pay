"use client";
import { useState, useEffect } from "react";
import history from "@/component/recent.module.css";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useWeb3 } from "@/context/context";

function RecentHistory() {
  const { Activity, contract, account, recent } = useWeb3();

  const [list, setList] = useState([]);

  useEffect(() => {
    check();
  }, [recent, account]);

  const check = async () => {
    if (contract && account) {
      const data = await Activity();
      console.log("data in check ", data);
      setList(data);
    }
  };
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className={history.history}>
      <p className={history.title}>Recent Activities</p>
      <div className={`${history.section} ${history.header}`}>
        <p className={`${history.clr1}`}>Payment Subject</p>
        <p>Action</p>
        <p className={`${history.clr1}`}>addr</p>
        <p>Message</p>
        <p className={`${history.clr1}`}>amount</p>
      </div>
      {list.length > 0 ? (
        [...list]
          .slice(startIndex, endIndex)
          .reverse()
          .map((item, i) => {
            return (
              <div className={history.section} key={i}>
                <p className={`${history.clr1}`}>
                  {item.name ? item.name : "N/A"}
                </p>
                <p>{item.action}</p>
                <p className={`${history.clr1}`}>
                  {item.otherPartyAddress.slice(0, 6) +
                    "...." +
                    item.otherPartyAddress.slice(-4)}
                </p>
                <p>{item.message}</p>
                <p className={`${history.clr1}`}>
                  {parseFloat(item.amount) / 1e18}
                </p>
              </div>
            );
          })
      ) : (
        <div className={history.empty}>
          YOU DO NOT HAVE ANY RECENT ACTIVITIES{" "}
        </div>
      )}

      {list.length > 0 && (
        <div className={history.pagination}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i>
              <LeftOutlined />
            </i>
          </button>
          <span className={history.page}> {currentPage}</span>
          {list.length > itemsPerPage ? "..." : ""}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= list.length}
          >
            <i>
              <RightOutlined />
            </i>
          </button>
        </div>
      )}
    </div>
  );
}

export default RecentHistory;
