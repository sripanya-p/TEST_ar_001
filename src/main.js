import './app.css'

import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app


import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import targetsMIND from '/targets.mind'


const THREE = window.MINDAR.IMAGE.THREE;


document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: targetsMIND,
    })

    const {renderer,cssRenderer, scene, cssScene, camera} = mindarThree;

    const obj = new CSS3DObject(document.querySelector('#app'));
    const cssAnchor = mindarThree.addCSSAnchor(0)
    cssAnchor.group.add(obj)


    await mindarThree.start()
    renderer.setAnimationLoop(() => {
      cssRenderer.render(cssScene, camera)
    })

  }
  start()
});
