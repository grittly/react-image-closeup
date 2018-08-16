/* global document */

import React, { Component } from 'react';
import { render } from 'react-dom';
import ImageCloseup from '../../src';
import demo from './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      modalOpen: true,
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    return (
      <div styleName="demo.container">
        {
          this.state.modalOpen ? <ImageCloseup
            closeModalFunc={this.closeModal}
            imageSrc="http://via.placeholder.com/2000x2000"
          /> : null
        }
        <h1>react-image-closeup demo</h1>
        <div styleName="demo.content">
          <figure>
            <img src="http://via.placeholder.com/350x350" width="350px" height="350px" alt="thumb_image" />
            <figcaption>This is a thumbnail. Click to open full version</figcaption>
          </figure>
          <div styleName="demo.button-container">
            <button onClick={this.openModal}>Open Modal</button>
          </div>
          <p>Here is some text to accompany the image. Amet non facilis suscipit doloribus architecto soluta. Molestias minus ea ipsam dolorum expedita iste? Itaque enim iste quae similique optio consectetur quaerat ea perspiciatis velit. Tempore consectetur quasi veritatis blanditiis cumque, laudantium, culpa iusto provident. Modi magni minima aliquid vero beatae provident! Dicta nesciunt qui aliquid animi numquam? Placeat nesciunt doloribus quasi quam accusantium earum ullam ipsa molestiae. Ipsam in consequuntur repellat et perspiciatis excepturi modi voluptate sed nihil ut corporis architecto consequuntur. Eveniet odit expedita quam soluta magnam. Ipsum nihil animi id quam debitis libero accusamus. Laboriosam inventore culpa ad asperiores harum. Quae esse distinctio dicta esse saepe eos.</p>
          <p>Consectetur nostrum numquam quia numquam aliquid quidem temporibus id. Accusantium laudantium facere ratione accusamus maxime? Ab dignissimos ipsum velit amet consequuntur eaque eos a! Asperiores voluptatem accusantium magnam cupiditate quibusdam repellat. Laborum magnam obcaecati cupiditate totam iure? Quia sunt illo at molestias sunt dignissimos. Veniam nemo odio necessitatibus exercitationem fugit neque libero. Alias ex totam fugit odit ut molestias molestias veniam nisi, modi harum? Delectus quibusdam nobis impedit et recusandae alias. Quibusdam magni repellendus at ullam illo? Aut incidunt aperiam incidunt dicta voluptate excepturi possimus, minus aperiam. Non aliquid possimus dicta labore exercitationem nulla. Aliquam iure laboriosam pariatur ea ab.</p>
          <p>Dolor voluptate omnis ab elit dicta cupiditate! Eius nulla praesentium sit numquam iusto mollitia. Fugiat provident quibusdam sapiente officia autem et tempore. Repellendus fugit pariatur repellendus a corrupti tenetur repellat iure saepe nam quia atque qui. Aut aliquid natus nam veniam adipisci. Ipsa dolorem libero laborum vero ab unde. Eum ad nemo quo molestiae harum ullam maxime. Repudiandae necessitatibus error architecto possimus odio! Animi unde eaque amet provident unde dolor! Dolorem repudiandae similique qui expedita at. Nesciunt ducimus placeat ut ad enim maiores! Delectus maxime fuga esse ad temporibus. Qui delectus quo esse quidem quidem. Facilis necessitatibus praesentium odio nesciunt.</p>
          <p>Sit adipisicing totam commodi porro asperiores quia odit ipsa autem quibusdam in vel laborum? Inventore libero ad adipisci hic obcaecati tempora? Voluptatum dolore amet veritatis eum ducimus, id. Consequuntur aut laudantium delectus mollitia eum deserunt officia! Iure perferendis a officiis expedita numquam qui consequuntur? Doloremque ab dignissimos expedita repellendus quasi provident. Accusantium non voluptates numquam quidem porro, rem, doloremque repellendus. Earum explicabo corrupti assumenda excepturi quidem. Quod repudiandae possimus itaque quos magni odit amet? Voluptates rem dolorem voluptates illum blanditiis, iste quam minima aperiam laborum? Qui porro ullam optio molestiae praesentium impedit ab facilis aliquam nam fugiat. Rem quas neque.</p>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
