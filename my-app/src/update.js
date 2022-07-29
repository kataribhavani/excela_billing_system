import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Update() {
  const [fetchedData, setFetchedData] = useState({
    billDate: "",
    paidDate: "",
    unitsConsumed: "",
    amount: "",
  });
  const history = useNavigate();
  const params = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/get_bills/${params?.id}`)
      .then((res) => {
        setFetchedData(res?.data);
      });
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .put(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/update_bill/${params?.id}`,
            fetchedData
          )
          .then((_) => {
            history("/");
          });
      }}
    >
      <div className="flex flex-col justify-between items-stretch m-4 space-y-4">
        <span>
          <label>Bill Generated Date: </label>
          <input
            type={"date"}
            value={fetchedData?.billDate}
            onChange={(e) =>
              setFetchedData({ ...fetchedData, billDate: e.target.value })
            }
            className="border border-black rounded w-44"
          />
        </span>
        <span>
          <label>Bill Paid Date: </label>
          <input
            type={"date"}
            value={fetchedData?.paidDate}
            onChange={(e) =>
              setFetchedData({ ...fetchedData, paidDate: e.target.value })
            }
            className="border border-black rounded w-44"
          />
        </span>
        <span>
          <label>Units Consumed: </label>
          <input
            type="text"
            value={fetchedData?.unitsConsumed}
            onChange={(e) =>
              setFetchedData({ ...fetchedData, unitsConsumed: e.target.value })
            }
            className="border border-black rounded w-44"
          />
        </span>
        <span>
          <label>Amount: </label>
          <input
            type="text"
            value={fetchedData?.amount}
            onChange={(e) =>
              setFetchedData({ ...fetchedData, amount: e.target.value })
            }
            className="border border-black rounded w-44"
          />
        </span>
      </div>
      <div>
        <button
          className="bg-blue-400 text-white flex justify-center m-4 border p-1 rounded"
          type={"submit"}
        >
          Update
        </button>
      </div>
    </form>
  );
}
