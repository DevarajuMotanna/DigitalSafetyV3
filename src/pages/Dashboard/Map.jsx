import PropTypes from "prop-types";
Map.propTypes = { url: PropTypes.string };

export default function Map({ url }) {
  //   const latitude = 28.887138;
  //   const longitude = 76.683619;
  //   const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1021.8545271774815!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9b032f3f1007%3A0x3ab4fe928fc5c0fc!2sMaruti%20Suzuki%20India%20Ltd.%20R%26D%20Plant!5e1!3m2!1sen!2sin!4v1706091534569!5m2!1sen!2sin!q=${latitude},${longitude}`;
  return (
    <div className="map">
      <iframe
        src={url}
        width="800"
        height="600"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
