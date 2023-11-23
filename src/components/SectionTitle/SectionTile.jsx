

const SectionTile = ({heading,subheading}) => {
    return (
        <div className="mx-auto text-center mb-2 md:w-4/12 my-8">
            <p className="text-yellow-600">- - - {subheading} - - - </p>
            <h3 className="text-4xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTile;