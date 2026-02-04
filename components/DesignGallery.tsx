
import React from 'react';

const DesignGallery: React.FC = () => {
    // Mimicking the complex layout with grid-based positioning
    return (
        <section className="bg-white py-16 md:py-24 px-4 overflow-hidden">
            <div className="text-center mb-12">
                <p className="text-darkGray font-medium text-lg">Share your setup with</p>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-secondary">#MarbluxDesigns</h2>
            </div>

            {/* Gallery Grid (Simulated Masonry using specific alignments) */}
                <div className="max-w-7xl mx-auto h-auto flex flex-col md:flex-row gap-6 items-center justify-center px-4 sm:px-6">
                    {/* Left Block */}
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <div className="flex flex-col gap-4 items-center md:items-end w-full md:w-auto">
                            <img 
                                src="https://picsum.photos/id/122/400/600" 
                                className="w-full sm:w-40 md:w-[274px] h-48 sm:h-60 md:h-[382px] object-cover rounded-sm" 
                                alt="Gallery 1"
                            />
                            <img 
                                src="https://picsum.photos/id/111/400/400" 
                                className="w-full sm:w-60 md:w-[381px] h-40 md:h-[323px] object-cover rounded-sm" 
                                alt="Gallery 2"
                            />
                        </div>
                        <div className="flex flex-col gap-4 items-center md:items-start w-full md:w-auto">
                            <img 
                                src="https://picsum.photos/id/145/800/600" 
                                className="w-full sm:w-80 md:w-[451px] h-44 sm:h-48 md:h-[312px] object-cover rounded-sm" 
                                alt="Gallery 3"
                            />
                            <img 
                                src="https://picsum.photos/id/162/400/400" 
                                className="w-full sm:w-60 md:w-[344px] h-40 md:h-[242px] object-cover rounded-sm" 
                                alt="Gallery 4"
                            />
                        </div>
                    </div>

                    {/* Center Image */}
                    <div className="flex-shrink-0 self-center">
                        <img 
                            src="https://picsum.photos/id/201/800/800" 
                            className="w-64 sm:w-72 md:w-[295px] h-64 sm:h-72 md:h-[392px] object-cover rounded-sm" 
                            alt="Gallery Center"
                        />
                    </div>

                    {/* Right Block */}
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <div className="flex flex-col gap-4 items-center md:items-start w-full md:w-auto">
                            <img 
                                src="https://picsum.photos/id/210/600/600" 
                                className="w-full sm:w-64 md:w-[290px] h-52 sm:h-64 md:h-[348px] object-cover rounded-sm" 
                                alt="Gallery 5"
                            />
                            <img 
                                src="https://picsum.photos/id/212/600/800" 
                                className="w-full sm:w-48 md:w-[178px] h-44 sm:h-60 md:h-[242px] object-cover rounded-sm" 
                                alt="Gallery 6"
                            />
                        </div>
                        <div className="flex flex-col gap-4 items-center md:items-start w-full md:w-auto">
                            <img 
                                src="https://picsum.photos/id/219/800/1000" 
                                className="w-full sm:w-60 md:w-[425px] h-64 sm:h-80 md:h-[433px] object-cover rounded-sm" 
                                alt="Gallery 7"
                            />
                            <img 
                                src="https://picsum.photos/id/222/400/400" 
                                className="w-full sm:w-56 md:w-[258px] h-40 md:h-[196px] object-cover rounded-sm" 
                                alt="Gallery 8"
                            />
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default DesignGallery;
