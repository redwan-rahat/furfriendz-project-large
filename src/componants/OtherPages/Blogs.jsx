import CatEating from '../Animations/CatEating';
import PetCare from '../Animations/PetCare';
import Secured from '../Animations/Secured';

const Blogs = () => {
    const blogs = [
        {
            number: '01',
            category: 'PET DELIVERY',
            title: 'How Does Furfriendz Keep Your Pet Safe During Delivery?',
            paragraphs: [
                'Bringing a new pet home should be an exciting experience, but traveling can sometimes be stressful for an animal. A safe journey starts with making sure your pet has a comfortable and secure environment throughout the trip.',
                'At Furfriendz, we focus on careful handling and a smooth delivery experience so pets can travel comfortably from our care to their new home. Keeping them calm, secure, and properly looked after is an important part of the journey.',
                'For pet owners, it is always worth asking how a pet will be transported, who will be handling them, and what steps are taken to keep them comfortable along the way.'
            ],
            animation: <CatEating />,
        },
        {
            number: '02',
            category: 'PET CARE',
            title: 'What Makes Furfriendz’s Pet Care Center a Good Choice?',
            paragraphs: [
                'There are times when your pet needs care while you are at work, traveling, or simply unable to give them your full attention. A good pet care environment should give them more than just a place to stay.',
                'A comfortable space, attentive staff, regular interaction, and time for play can help pets feel more relaxed while their owners are away. Keeping their daily needs in mind also makes the experience easier for both the pet and the owner.',
                'Before choosing a pet care center, look for a clean environment, responsible caregivers, proper attention to each animal, and a place where your pet can feel safe and comfortable.'
            ],
            animation: <PetCare />,
        },
        {
            number: '03',
            category: 'PET SAFETY',
            title: 'What Should You Know Before Bringing a New Pet Home?',
            paragraphs: [
                'The first few days with a new pet are an important time for them to adjust. A new home has unfamiliar sounds, smells, people, and surroundings, so giving your pet time to settle in can make the transition much easier.',
                'Before bringing your new companion home, prepare a quiet and comfortable space where they can rest. Having their food, water, bedding, and other basic supplies ready also helps them settle into their new environment.',
                'Most importantly, give your pet patience and consistency. Let them explore at their own pace, pay attention to their behavior, and gradually introduce them to the people and routines around them.'
            ],
            animation: <Secured />,
        },
    ];

    return (
        <div className="min-h-screen bg-[#C8E6D0]">

            <main className="w-11/12 lap:w-10/12 des:w-9/12 mx-auto pt-12 tab:pt-16 lap:pt-20 pb-24 tab:pb-32">

        
                <header className="text-center max-w-3xl mx-auto mb-12 tab:mb-16 lap:mb-20">

                    <h1 className="text-[#075E63] text-4xl tab:text-5xl lap:text-6xl font-semibold tracking-tight">
                        Explore & Learn
                    </h1>

                    <p className="mt-5 text-[#527A73] text-sm tab:text-base lap:text-lg leading-relaxed max-w-2xl mx-auto">
                        Helpful guides, tips, and insights to help you care for
                        your pets and make every step of the journey easier.
                    </p>

                </header>


                <section className="bg-[#dfece1] rounded-[2rem] tab:rounded-[2.5rem] lap:rounded-[3rem] px-6 py-10 tab:px-12 tab:py-14 lap:px-20 lap:py-20 border border-[#DCE9DE] shadow-[0_12px_40px_rgba(40,90,70,0.06)]">

                    <div className="space-y-12 tab:space-y-16 lap:space-y-20">

                        {blogs.map((blog, index) => (

                            <article key={blog.number}>

                                <div
                                    className={`tab:flex items-center justify-between gap-10 lap:gap-16 ${
                                        index % 2 !== 0
                                            ? 'tab:flex-row-reverse'
                                            : ''
                                    }`}
                                >

                             
                                    <div className="w-full tab:w-[40%] lap:w-[38%] mb-8 tab:mb-0">

                                        <div className="h-60 tab:h-72 lap:h-80 rounded-3xl bg-[#d7e4d9] border border-[#D4E4D7] flex items-center justify-center overflow-hidden">

                                            <div className="w-48 h-48  tab:w-56 tab:h-56 lap:w-64 lap:h-64">
                                                {blog.animation}
                                            </div>

                                        </div>

                                    </div>


                     
                                    <div className="w-full tab:w-[53%] lap:w-[55%]">

                            
                                        <div className="flex items-center gap-3 mb-4">

                                            <span className="text-[#568078] text-xs font-medium">
                                                {blog.number}
                                            </span>

                                            <span className="w-8 h-px bg-[#28706E]"></span>

                                            <span className="text-[#28706E] text-[10px] tab:text-xs tracking-[0.18em] font-medium">
                                                {blog.category}
                                            </span>

                                        </div>


                              
                                        <h2 className="text-[#075E63] text-2xl tab:text-3xl lap:text-4xl font-semibold leading-tight tracking-tight">
                                            {blog.title}
                                        </h2>


                                        <div className="mt-5 space-y-4 text-[#527A73] text-sm tab:text-base leading-7">

                                            {blog.paragraphs.map(
                                                (paragraph, paragraphIndex) => (
                                                    <p key={paragraphIndex}>
                                                        {paragraph}
                                                    </p>
                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>


                   
                                {index !== blogs.length - 1 && (
                                    <div className="mt-12 tab:mt-16 lap:mt-20 border-t border-[#D2E2D5]"></div>
                                )}

                            </article>

                        ))}

                    </div>

                </section>

            </main>

        </div>
    );
};

export default Blogs;