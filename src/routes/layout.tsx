import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default component$(() => {
    useVisibleTask$(() => AOS.init({
        easing: "ease-out-back",
        once: false,
        useClassNames: true,
    }))

    return (
        <Slot />
    );
});