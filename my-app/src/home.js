import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const [existingBills, setExistingBills] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/get_bills`)
      .then((resp) => {
        setExistingBills(resp?.data);
      });
  }, []);
  const history = useNavigate();
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-row space-x-2 justify-center items-center m-4">
        <span>
          <FontAwesomeIcon
            icon={faFileAlt}
            size={"2x"}
            className="text-blue-400"
          />
        </span>
        <span className="font-semibold text-xl">Electricity Bill Record</span>
      </div>
      {existingBills?.length > 0 && (
        <div className="flex justify-center items-center">
          <table className="border-2 border-black">
            <thead>
              <tr>
                <th className="border-2 border-black p-2">ID</th>
                <th className="border-2 border-black p-2">
                  Bill Generated Date
                </th>
                <th className="border-2 border-black p-2">Bill Paid Date</th>
                <th className="border-2 border-black p-2">Units Consumed</th>
                <th className="border-2 border-black p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {existingBills?.map((bill, idx) => {
                return (
                  <tr key={idx}>
                    <td>{bill?.id}</td>
                    <td>{bill?.billDate}</td>
                    <td>{bill?.paidDate}</td>
                    <td>{bill?.unitsConsumed}</td>
                    <td className="flex flex-row space-x-2 p-2 w-28 justify-between items-center">
                      <span>{bill?.amount}</span>
                      <span>
                        <button className="bg-blue-400 text-white hover:bg-blue-500 p-0 rounded w-10 h-6">
                          <span
                            className="text-xs font-semibold"
                            onClick={(e) => history(`/view/${bill?.id}`)}
                          >
                            View
                          </span>
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <span className="flex justify-center items-center">
        <Link to="/addBill">
          <span className="bg-blue-500 text-white p-1 rounded-sm">
            Add Bill
          </span>
        </Link>
      </span>
    </div>
  );
}
