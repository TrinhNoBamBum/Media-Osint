'use client'
import React from 'react';

const Modal = ({ isOpen, onClose, children }:any) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75"></div>
            <div className="relative bg-white rounded-lg p-8">
                {children}
                <button className="absolute top-0 right-0 mt-2 mr-2" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default Modal;