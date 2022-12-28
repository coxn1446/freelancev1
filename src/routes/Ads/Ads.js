import './Ads.css';
import React from 'react';
import Nav from '../../components/Nav/Nav'

const Ads = () => {
  
  return (
    <div className="gridContainerAds">
      <Nav></Nav>
      <div className="paragraphAds">Like every other boy from a small town in Maine, I've always had a dream of selling digital advertisements. After some trial and error, I have finally figured out how to make that happen. All you have to do to buy an ad from me is fill out the form below.</div>
      <div className="paragraphAds">I only accept two ad formats, their sizes are in pixels: 728x90 & 300x250. You can submit either or both; it's a $5 flat rate no matter what. If you buy an ad from me, your creative will live on the homepage of this site for 24 hours. I will connect with you to sort out payment details and collect creative files via your preferred contact method.</div>
      <div className="paragraphAds">I cannot perform any sort of targeting whatsoever. Google Analytics is easy enough to enable but I don't care enough about this joke to set it up. So no reporting of any kind either. You honestly will get nothing from this other than the knowledge that you helped my childhood dream become a reality.</div>
      <div className="formTitleAds"><h2 style={{textAlign: 'center', marginBottom: '5px'}}>Submit an Ad</h2></div>
      <form className="formAds" method='post' action="/ads" id="form3">
        <section className="sectionAds">
          <label for="brandAds">What are you advertising?</label>
          <input className="inputAds" form="form3" type="text" id="brandAds" name="brandAds" placeholder="Brand/Item/Service"></input>
        </section>
        <section className="sectionAds">
        <label for="dateAds">Pick a date</label>
          <input className="inputAds"  form="form3" type="date" id="dateAds" name="dateAds"></input>
        </section>
        <section className="sectionAds">
          <label for="dimmensionsAds728s90">728x90</label>
          <input className="inputAds"  form="form3" type="checkbox" id="dimmensionsAds728x90" name="dimmensionsAds728s90" value="728x90"></input><br></br>
          <label for="dimmensionsAds300x250">300x250</label>
          <input className="inputAds" form="form3" type="checkbox" id="dimmensionsAds300x250" name="dimmensionsAds300x250" value="300x250"></input><br></br>
        </section>
        <section className="sectionAds">
          <label for="urlAds">Where should the ad drive users to?</label>
          <input className="inputAds"  form="form3" type="text" id="urlAds" name="urlAds" placeholder="Ad URL"></input>
        </section>
        <section className="sectionAds">
          <label for="contactAds">Provide a way to contact you</label>
          <input className="inputAds"  form="form3" type="text" id="contactAds" name="contactAds" placeholder="email or phone#"></input>
        </section>
        <section className="sectionAds">
          <label for="barterAds">How will you be paying?</label>
          <input className="inputAds"  form="form3" type="text" id="barterAds" name="barterAds" placeholder="venmo, barter, BTC, etc."></input>
        </section>
          <button type="submit" form="form3">Submit Request</button>
      </form>
      <div style={{gridColumn: '1 / span 12', gridRow: 'span 1'}}><br></br></div>
    </div>
  );
}

export default Ads;