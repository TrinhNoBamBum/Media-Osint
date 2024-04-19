'use client'
import React from 'react';

const ModalAddPage = ({ isOpen1, onClose1, children }:any) => {
    if (!isOpen1) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75"></div>
            <div className="relative bg-white rounded-lg p-8 w-2/4">
                {children}
                <button className="absolute top-0 right-0 mt-2 mr-2" onClick={onClose1}>X</button>
            </div>
        </div>
    );
};

export default ModalAddPage;