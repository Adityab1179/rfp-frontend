import React,{useState} from "react";
import { useEffect } from "react";
function RFPView() {
    const [RFPs,setRFPS]=useState([])
    const [lastDate,setLastDate]=useState("")
  useEffect(() => {
    const fetchRFP = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/rfpview`);
        const data = await response.json();
        setRFPS(data.RFPs);
        setLastDate(data.RFPs.lastDate)
        console.log(data.RFPs)
      } catch (err) {
        console.log("Unable to fetch");
      }
    };
    fetchRFP();
  }, []);
  
  return (
    <div className="main-page-home">
      <div className="main-page-home-header">
        <h4>Vendors List</h4>
        <p>Home / Vendors</p>
      </div>
      <div className="main-page-home-content">
        <div className="main-page-home-content-header">
          <h4>Vendors</h4>

          <table>
            <thead>
              <tr>
                <th>S. No</th>
                <th>Item Name</th>
                <th>Item Description</th>
                <th>Last Date</th>
                <th>Minimum Price</th>
                <th>Maximum Price</th>
              </tr>
            </thead>
            <tbody>
                  {RFPs.map((RFP, index) => (
                    <tr key={RFP._id}>
                      <td>{index + 1}</td>
                      <td>{RFP.itemName}</td>
                      <td>{RFP.itemDescription}</td>
                      <td>{RFP.lastDate.slice(0,10)}</td>
                      <td>{RFP.minimumPrice}</td>
                      <td>{RFP.maximumPrice}</td>
                    </tr>
                  ))}
                </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RFPView;
