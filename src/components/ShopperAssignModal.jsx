import { useState, useEffect } from "react";

const ShopperAssignModal = ({shoppers,setOpenAssignModal}) => {

  const Apply = ()=> {
    setOpenAssignModal(false);
  }
  const Cancel = ()=> {
    setOpenAssignModal(false);
  }

  return (
    <div className="dt-modal">
      <div className="dt-modal-header">
        <p className="text-m-bold">Assign order to</p>
        <p className="dt-modal-header-phone text-m-bold ">Phone</p>
      </div>
      <div className="dt-modal-data">
        <label className="dt-modal-data-item">
          <div>
            <input type="checkbox" />
             Rj Puma
          </div>
          <div>
            <p>914-648-8855</p>
          </div>
        </label>
      </div>
      <button onClick={()=>{Apply()}} className="btn btn-primary">
        Apply
      </button>
    </div>
  );
};

export default ShopperAssignModal;
