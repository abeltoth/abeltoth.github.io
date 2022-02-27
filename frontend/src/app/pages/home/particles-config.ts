import { ISourceOptions } from 'tsparticles';

const particlesOptions: ISourceOptions = {
  background: {
    color: {
      value: '#01001b',
    },
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: {
        enable: false,
        mode: 'connect',
      },
      onHover: {
        enable: true,
        mode: 'connect',
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 100,
        duration: 1,
        opacity: 1,
        size: 3,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      connect: {
        radius: 100,
        lineLinked: {
          opacity: 1,
        },
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: false,
      opacity: 1,
      width: 0.5,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'out',
      random: false,
      speed: 0.05,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 100,
      },
      value: 20,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      random: true,
      value: 1.5,
      anim: {
        enable: true,
        size_min: 0.1,
        speed: 1.5,
      },
    },
  },
  detectRetina: true,
};

export default particlesOptions;
