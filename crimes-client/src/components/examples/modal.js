import React,{Component} from 'react';

 const Myproductmodal =({handleClose,show,myProduct,children})=>{
  const showHideClassNames = show?"modal display-block":"modal display-none";
  return (
    <div className={showHideClassNames}>
    <section className="modal-main">
      {children}
      <h4 className="modal-title">{myProduct.title}</h4>
      <p className="modal-body">{myProduct.body}</p>
      <button onClick={handleClose}>Close modal</button>
    </section>
    </div>
    );
}
export default Myproductmodal;