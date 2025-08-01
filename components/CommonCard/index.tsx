import { DrupalNode } from 'next-drupal';
import React from 'react'



const cardVariants = {
    normal_card: {
        padding: 'p-4',
        textColor: 'text-black',
    },
    card_with_index: {
        padding: 'p-5',
        textColor: 'text-gray-800',
    },
    card_with_link: {
        padding: 'px-6 py-4',
        textColor: 'text-blue-600',
    },
    card_with_desc: {
        padding: 'p-6',
        textColor: 'text-gray-700',
    },
    card_with_bigImage: {
        padding: 'p-0',
        textColor: 'text-black',
    },
    card_with_border: {
        padding: 'p-4',
        textColor: 'text-black',
        border: 'border border-gray-300',
    },
    card_with_noBorder: {
        padding: 'p-4',
        textColor: 'text-black',
        border: 'border-none',
    },
    card_with_flip_flop: {
        padding: 'p-5',
        textColor: 'text-gray-600',
    },
    card_with_button: {
        padding: 'px-8 py-4',
        textColor: 'text-white',
        bg: 'bg-blue-600',
    },
    card_with_color: {
        padding: 'p-4',
        textColor: 'text-white',
        bg: 'bg-green-600',
    },
    card_with_seprateDesc: {
        padding: 'py-6 px-4',
        textColor: 'text-gray-500',
    }
};

const cardData = [
    {
        title: 'Card with Border',
        desc: 'This card has a border and a simple description.',
        image: 'https://via.placeholder.com/300',
        variant: 'card_with_border'
    },
    {
        title: 'Card with Button',
        desc: 'This one has a button.',
        image: 'https://via.placeholder.com/300',
        variant: 'card_with_button',
        buttonLabel: 'Click Me'
    },
    {
        title: 'Link Card',
        desc: 'Contains a link to something.',
        variant: 'card_with_link',
        link: 'https://example.com'
    },
    {
        title: 'Colored Card',
        desc: 'This card has a green background.',
        variant: 'card_with_color'
    }
];



const DynamicCard = ({ variant = "normal_card", title:string, description, icon, buttonText }) => {
    const styles = cardVariants[variant] || cardVariants["normal_card"];

    return (
        <div
            className={`rounded-xl shadow ${styles.padding} ${styles.color} ${styles.backgroundColor || "bg-white"} ${styles.border || ""}`}
        >
            {icon && <div className="mb-4">{icon}</div>}
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm">{description}</p>
            {buttonText && (
                <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">
                    {buttonText}
                </button>
            )}
        </div>
    );
};


export default DynamicCard;

