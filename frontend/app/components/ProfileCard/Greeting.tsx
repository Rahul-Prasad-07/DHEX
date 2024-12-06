

export function Greeting({ image, name }:
    {
        image: string;
        name: string;
    }) {
    return (
        <div className="flex items-center">
            <img src={image} alt="profile" className="w-16 h-16 rounded-full mr-4" />
            <div className="text-2xl font-semibold">
                Welcome back, <span className="text-blue-600">{name}</span>!
            </div>
        </div>
    );
}
