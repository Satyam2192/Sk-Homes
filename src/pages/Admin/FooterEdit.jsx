import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';

export default function EditFooter() {
    const [footerData, setFooterData] = useState({
        heading: '',
        para: '',
        buttonText: '',
        buttonLink: '',
        LinkText1: '',
        Link1: '',
        LinkText2: '',
        Link2: '',
        LinkText3: '',
        Link3: '',
        LinkText4: '',
        Link4: '',
        LinkText5: '',
        Link5: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        youtube: '',
        copyright: '',
    });

    useEffect(() => {
        fetch('/api/footer/get')
            .then((response) => response.json())
            .then((data) => setFooterData(data[0]))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFooterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/footer/update/65c3836265548e91da9696d1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(footerData),
        })
            .then((response) => response.json())
            .then((updatedData) => console.log('Data updated successfully:', updatedData))
            .catch((error) => console.error('Error updating data:', error));
    };

    if (!footerData.heading) {
        return <div><Loader /></div>;
    }

    return (
        <div className=" flex items-center justify-center bg-gray-100">
            <div className=" mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-center text-gray-800">Edit Footer</h1>
                <form onSubmit={handleSubmit} className="mt-10">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Heading:</label>
                            <input
                                type="text"
                                name="heading"
                                value={footerData.heading}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Paragraph:</label>
                            <textarea
                                name="para"
                                value={footerData.para}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[120px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Button Text:</label>
                            <input
                                type="text"
                                name="buttonText"
                                value={footerData.buttonText}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Button Link:</label>
                            <input
                                type="text"
                                name="buttonLink"
                                value={footerData.buttonLink}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <h2 className="mt-10 text-xl font-semibold text-gray-800">Links:</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Link Text 1:</label>
                            <input
                                type="text"
                                name="LinkText1"
                                value={footerData.LinkText1}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Link 1:</label>
                            <input
                                type="text"
                                name="Link1"
                                value={footerData.Link1}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Link Text 2:</label>
                            <input
                                type="text"
                                name="LinkText2"
                                value={footerData.LinkText2}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Link 2:</label>
                            <input
                                type="text"
                                name="Link2"
                                value={footerData.Link2}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Link Text 3:</label>
                            <input
                                type="text"
                                name="LinkText3"
                                value={footerData.LinkText3}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Link 3:</label>
                            <input
                                type="text"
                                name="Link3"
                                value={footerData.Link3}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Link Text 4:</label>
                            <input
                                type="text"
                                name="LinkText4"
                                value={footerData.LinkText4}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Link 4:</label>
                            <input
                                type="text"
                                name="Link4"
                                value={footerData.Link4}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Link Text 5:</label>
                            <input
                                type="text"
                                name="LinkText5"
                                value={footerData.LinkText5}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Link 5:</label>
                            <input
                                type="text"
                                name="Link5"
                                value={footerData.Link5}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <h2 className="mt-10 text-xl font-semibold text-gray-800">Social Media:</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Twitter:</label>
                            <input
                                type="text"
                                name="twitter"
                                value={footerData.twitter}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Instagram:</label>
                            <input
                                type="text"
                                name="instagram"
                                value={footerData.instagram}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">LinkedIn:</label>
                            <input
                                type="text"
                                name="linkedin"
                                value={footerData.linkedin}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">YouTube:</label>
                            <input
                                type="text"
                                name="youtube"
                                value={footerData.youtube}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="mt-10">
                        <label className="block text-sm font-medium text-gray-700">Copyright:</label>
                        <input
                            type="text"
                            name="copyright"
                            value={footerData.copyright}
                            onChange={handleChange}
                            className="mt-1 p-2 w-[340px] md:w-[470px] h-[50px] border border-gray-300 rounded-md"
                        />
                    </div>

                    <button type="submit" className="mt-10 bg-[#059669] text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}