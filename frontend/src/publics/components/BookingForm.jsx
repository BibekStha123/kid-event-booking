import React from 'react';

function BookingForm(props) {

    const onSubmit = (e) => {

    }

    return (
        <div className="container p-5">
            <div className="card">
                <h2 className="text-center my-4">Booking Form</h2>
                <div className="card-body p-4 py-0">
                    {/* {errors && <div>
                        {Object.keys(errors).map(key => (
                            <p className='text-danger text-center' key={key}>{errors[key][0]}</p>
                        ))}
                    </div>} */}
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Enter Name" required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" required />
                        </div>
                        <button className="btn btn-primary mb-3">Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookingForm;