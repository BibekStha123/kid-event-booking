import React, { useEffect, useRef, useState } from 'react';

function Modal({ confirmPaymentDetails }) {

    const [minDate, setMinDate] = useState('')
    const [disabled, setDisabled] = useState(false)

    const cardRef = useRef();
    const expiryDateRef = useRef();
    const cvcRef = useRef();

    useEffect(() => {
        const today = new Date();

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 2).padStart(2, '0'); // Months are zero-based
            return `${year}-${month}`;
        };

        setMinDate(formatDate(today));
    }, [])

    const handlePaymentData = () => {
        setDisabled(true)
        confirmPaymentDetails({
            cardNo: cardRef.current.value,
            expiryDate: expiryDateRef.current.value,
            cvc: cvcRef.current.value
        })
    }

    const clearModalField = () => {
        cardRef.current.value = '',
        expiryDateRef.current.value = '',
        cvcRef.current.value = ''
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Payment</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={clearModalField} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group mb-3">
                            <label>Card Number</label>
                            <input ref={cardRef} type="text" className="form-control" placeholder="Card Number" required />
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Expiry Date</label>
                                <input type="month" min={minDate} ref={expiryDateRef} className="form-control" placeholder="MM/YY" required />
                            </div>
                            <div className="form-group col-md-6">
                                <label>CVC</label>
                                <input type="text" ref={cvcRef} className="form-control" placeholder="CVC" required />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clearModalField}>Cancel</button>
                        <button type="button" className="btn btn-primary" disabled={disabled} onClick={handlePaymentData}>Confirm Payment</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;