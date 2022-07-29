import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function View() {
  const params = useParams();
  const history = useNavigate();
  const [fetchedData, setFetchedData] = useState();
  const [onDelete, setOnDelete] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/get_bills/${params?.id}`)
      .then((res) => {
        setFetchedData(res?.data);
      });
  }, []);
  return (
    <div className="flex flex-col w-64 m-4 justify-center items-stretch border-2 p-2 bg-orange-300">
      <span className="flex justify-between">
        <label>Bill Generated Date: </label>
        <span className="text-pink-600">{fetchedData?.billDate}</span>
      </span>
      <span className="flex justify-between">
        <label>Bill Paid Date: </label>
        <span className="text-pink-600">{fetchedData?.paidDate}</span>
      </span>
      <span className="flex justify-between">
        <label>Units Consumed: </label>
        <span className="text-pink-600">{fetchedData?.unitsConsumed}</span>
      </span>
      <span className="flex justify-between">
        <label>Amount: </label>
        <span className="text-pink-600 text-xl">{fetchedData?.amount}</span>
      </span>
      <span className="flex flex-row justify-between m-2">
        <button className="bg-blue-400 text-white hover:bg-blue-500 p-2 flex justify-center items-center rounded w-12 h-6">
          <span
            className="text-xs font-semibold"
            onClick={(e) => history(`/update/${fetchedData?.id}`)}
          >
            Modify
          </span>
        </button>
        <button
          className="bg-blue-400 text-white hover:bg-blue-500 p-0 flex justify-center items-center rounded w-12 h-6"
          onClick={async (e) => {
            if (!onDelete) {
              try {
                setOnDelete(true);
                await axios?.delete(
                  `${process.env.REACT_APP_BACKEND_BASE_URL}/delete_bill/${fetchedData?.id}`
                );
                setOnDelete(false);
                history("/");
              } catch (error) {
                setOnDelete(false);
              }
            }
          }}
        >
          <span className="text-xs font-semibold">Delete</span>
        </button>
      </span>
    </div>
  );
}
