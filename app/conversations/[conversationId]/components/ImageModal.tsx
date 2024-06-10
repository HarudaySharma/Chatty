'use client'
import Modal from '@/app/components/sidebar/Modal';
import Image from 'next/image';
import React from 'react'

interface ImageModalProps {
    src: string;
    isOpen?: boolean;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
    src,
    isOpen,
    onClose,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='w-80 h-80' >
                <Image
                    alt='Image'
                    className='object-cover'
                    fill
                    src={src}
                />
            </div>
        </Modal>
    )
}

export default ImageModal
