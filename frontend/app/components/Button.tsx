'use client';
// generic button component that can be used in any component
export const PrimaryButton = ({children, onClick}:{
    children: React.ReactNode;
    onClick: () => void;
}) => {
    return <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" 
    onClick={onClick}> {children}
    </button>
}

export const SecondaryButton = ({children, onClick, prefix}:{
    children: React.ReactNode,
    onClick: () => void,
    prefix?: React.ReactNode
}) => {
    return <button onClick={onClick} type="button" className="text-white bg-blue-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-3 me-2 mb-2 flex" >
    <div>
        {prefix}
    </div>
    <div>
        {children}
    </div>
    </button>
}

export const TabButton = ({children, onClick, active}:{children: React.ReactNode, onClick: () => void, active?: boolean}) => {
    return <button type="button" className={`text-white hover:bg-blue-600 px-4 py-2 focus: ring-blue:300 font-medium rounded shadow text-sm psx-5 me-2 mb-2 ${active? "bg-blue-500": "bg-blue-300"}`} onClick={onClick}>
        {children}
    </button>
}

