///////////////////ACCORDION //////////////////////////

// Selecting the Accordian Headers and Form Areas that need hiding
const form = document.querySelector('form');
const formDiv =document.querySelector('#hero');
const outputDiv = document.querySelector('#output');
const accordianHeaders = document.querySelectorAll(".accordion-item-header");
let hide = document.querySelectorAll(".hide");


// Using ForEach to add event listeners which toggle the class hide on selected item and add close the other items

accordianHeaders.forEach((header) => {
  header.addEventListener("click", (event) => {
  let theHeader = event.target;
  let myTarget = theHeader.nextElementSibling;
  
  hide.forEach((item) => {
    if(item === myTarget){
      return;
    }item.classList.add("hide");
    })
  
  myTarget.classList.toggle('hide');

  });
});

/////////////////////OPTIONAL DATA DISPLAY ON/OFF/////////////////
//ABROAD TRAVEL QUESTIONS ON/OFF
function showHide () {
    const optional= document.getElementById('optional');
    
    if(document.getElementById('tripAbroad').checked) {
    optional.classList.remove('hide'); 
    } else {
    optional.classList.add('hide');
    }}
    
    const radioButtons = document.querySelectorAll('input[name="abroad"]');
    radioButtons.forEach(radio => {
    radio.addEventListener('click', showHide);
    })
//ACCOMMODATION BOOKING QUESTION ON/OFF
function showHideBooking () {
    const booking = document.getElementById('booking');
    
    if(document.getElementById('hotel').checked || document.getElementById('hostel').checked) {
    booking.classList.remove('hide'); 
    } else {
    booking.classList.add('hide');
    }}
    
    const radioButtonsBooking = document.querySelectorAll('input[name="stay"]');
    radioButtonsBooking.forEach(radio => {
    radio.addEventListener('click', showHideBooking);
  })
//CAR/CYCLE RENTAL QUESTION ON/OFF
function showHideRental() {
    const rental = document.getElementById('rental');
    
    if(document.getElementById('driving').checked || document.getElementById('cycling').checked) {
    rental.classList.remove('hide'); 
    } else {
    rental.classList.add('hide');
    }}
    
    const radioButtonsRental = document.querySelectorAll('input[name="transport"]');
    radioButtonsRental.forEach(radio => {
    radio.addEventListener('click', showHideRental);
  })
//TRANSPORT BOOKING QUESTION ON/OFF
  function showHideTickets() {
    const tickets = document.getElementById('tickets');
    
    if(document.getElementById('publicTransport').checked) {
    tickets.classList.remove('hide'); 
    } else {
    tickets.classList.add('hide');
    }}
    
    const radioButtonTicket = document.querySelector('#publicTransport');
    radioButtonTicket.addEventListener('click', showHideTickets);
  

///////////////////////DATA////////////////////////

//Selecting required form fields
const name = document.querySelector('#name');

///Adding EventListsner for form submission

const basics = document.querySelector('#basics');

form.addEventListener('submit', (event) => {
  sessionStorage.setItem("name", document.querySelector('#name').value);
  sessionStorage.setItem("date", document.querySelector('#date').value);
  //ADDING BASIC PACKING LIST  
  basic.forEach((item) => {
    basics.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`);
  })
  //ADDING TRIP-SPECIFIC ITEM LISTS
  addItemsforOtherTravellers();
  addItemsForTripType();
  addItemsforAccommodation();
  addItemsforTransport();
  
  bookingToDo();
  ticketsToBook();
  transportToRent();
  visaToArrange();
  financeCheck();
  medicalCheck();
  initializeClock2();

  formDiv.classList.add('hide');
  outputDiv.classList.remove('hide');
  const endDate = document.querySelector('#date');
  
  
  
  event.preventDefault();
})

////////////////////PACKING LISTS//////////////////

let basic = ['Clothes', 'Shoes', 'Pajamas', 'Toiletries', 'Prescriptions', 'Credit or Debit cards' , 'Suitcase or backpack', 'Toothbrush and toothpaste', 'Hairbush and hair groooming accessories', 'Camera', 'Chargers'];
let forKids = ['Toys', 'Kids clothes and shoes', 'Snacks.Baby food', 'Tissues and wipes', 'First aid kit','Medications','Nappies'];
let forPets = ['Pet food and water','Pet toys', 'Travel water dispenser', 'Disposable bags','Pet leash and ID tags','First aid kit for pets'];

let forBeach = ['Sun Cream','Swimwear','Flip flops','Sunglasses'];
let forCity = ['Maps or travel guide','Comfortable walking shoes','Outfit for going out'];
let forHike = ['Hiking shoes', 'Waterproof clothing', 'Plasters','Food and water','Insect repellent'];
let forSafari = ['Comfortable shoes', 'Snacks and water','Insect repellent','Sun cream'];
let forSkiing = ['Ski suit', 'Skiing set','Snow goggles','Boots','Thermal underwear', 'Sunscreen'];

let forHotel = ['Booking confirmation'];
let forHostel = ['Booking confirmation','Towel','Shower gel and shampoo','Flip flops'];
let forCampling = ['Tent','Sleeping bag','Wet wipes and tissues','Power bank','Portable light','Portable cooking equipment','Cutlery'];

let forPublicTransport = ['Tickets','Travel pillow','Book','Snacks and water'];
let forDriving = ['Driving licence and car documents','Sat nav','First aid kit','Breakdown cover details','Snacks and water'];
let forCycling = ['Spare tyre','Tyre pump','Puncture kit','Plasters','Reflective clothing','Bike light','Cycling helmet','Snacks and water'];


/////TRIP OPTION SELECTOR REFERENCES////////
let withKids = document.querySelector('#family');
let withPets = document.querySelector('#pet');

let beachHoliday = document.querySelector('#beach');
let cityHoliday = document.querySelector('#city');
let hikingHoliday = document.querySelector('#hike');
let skiingHoliday = document.querySelector('#ski');
let safariHoliday = document.querySelector('#safari');

let hotelStay = document.querySelector('#hotel');
let hostelStay = document.querySelector('#hostel');
let tentStay = document.querySelector('#tent');

let stayNotArranged = document.querySelector('#stayNotArranged');

let publicTransport = document.querySelector('#publicTransport');
let driving = document.querySelector('#driving');
let cycling = document.querySelector('#cycling');

let ticketsNotArranged = document.querySelector('#ticketsNotArranged')
let rentalNotArranged= document.querySelector('#rentalNotArranged');
let visaToSort= document.querySelector('#visaToSort');
let cash = document.querySelector('#cash');
let card = document.querySelector('#card');
let medicalPrepToSort = document.querySelector('#medicalPrepToSort');


let booked = document.querySelector('#stayArranged');

/////PACKING LIST RECEIVER SECTION REFERENCES//////////
let forOtherTravellers = document.querySelector('#forOtherTravellers');
let forHolidayType= document.querySelector('#forHolidayType');
let forAccommodation= document.querySelector('#forAccommodation');
let forTransport = document.querySelector('#forTransport');
let stillToDo = document.querySelector('#stillToDo');


////CALLBACK FUNCTIONS FOR CUSTOM PACKING LIST SELECTION
//BASED ON WHO IS TRAVELLING
function addItemsforOtherTravellers (){
  if(withKids.checked){
    forKids.forEach((item) => {forOtherTravellers.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`);
  })
  } else if (withPets.checked) {
    forPets.forEach((item) =>forOtherTravellers.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  } else  {}
};
//BASED ON TRIP TYPE
function addItemsForTripType () {
  if(beachHoliday.checked){
    forBeach.forEach((item) =>forHolidayType.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  } else if (cityHoliday.checked) {
    forCity.forEach((item) =>forHolidayType.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  } else if (hikingHoliday.checked) {
    forHike.forEach((item) =>forHolidayType.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  } else if (skiingHoliday .checked) {
    forSkiing.forEach((item) =>forHolidayType.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  } else if (safariHoliday.checked) {
    forSafari.forEach((item) =>forHolidayType.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  } 
};
//BASED ON ACCOMMODATION TYPE
function addItemsforAccommodation(){
  if(hotelStay.checked){
    forHotel.forEach((item) =>forAccommodation.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  } else if (hostelStay.checked) {
    forHostel.forEach((item) =>forAccommodation.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  }  else if (tentStay.checked) {
    forCampling.forEach((item) =>forAccommodation.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  }
};

//BASED ON TRANSPORT TYPE
function addItemsforTransport (){
  if(publicTransport.checked){
    forPublicTransport.forEach((item) =>forTransport.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  } else if (driving.checked) {
    forDriving.forEach((item) =>forTransport.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  }  else if (cycling.checked) {
    forCycling.forEach((item) =>forTransport.insertAdjacentHTML('beforeend',`<li><input type = 'checkbox'> ${item}</li>`))
  }
};

//CHECKS FOR REMAINING PREPARATIONS 
function bookingToDo() {
  if(stayNotArranged.checked) {stillToDo.insertAdjacentHTML('beforeend', '<li><input type = "checkbox"> Book the accommodation </li>')}
};
function ticketsToBook() {
  if(ticketsNotArranged.checked) {stillToDo.insertAdjacentHTML('beforeend', '<li><input type = "checkbox"> Book the tickets </li>')}
};
function transportToRent() {
  if(rentalNotArranged.checked) {stillToDo.insertAdjacentHTML('beforeend', '<li><input type = "checkbox"> Rent a car/bike </li>')}
};
function visaToArrange() {
  if(visaToSort.checked) {stillToDo.insertAdjacentHTML('beforeend', '<li><input type = "checkbox"> Arrange a visa </li>')}
};

function financeCheck() {
  if(cash.checked) {stillToDo.insertAdjacentHTML('beforeend', '<li><input type = "checkbox"> Exchange currency </li>')
} else if (card.checked) {
  stillToDo.insertAdjacentHTML('beforeend', '<li><input type = "checkbox"> Call bank to unlock card to be used abroad </li>')}
};

function medicalCheck() {
  if(medicalPrepToSort.checked) {stillToDo.insertAdjacentHTML('beforeend', '<li> Complete medical preparations for the trip</li>')}
};

///////////////////////////Countdown timer/////////////////////////////
function initializeClock2 () {
  let clock2 = document.getElementById("clockdiv2");
  let deadline2 = document.getElementById('date').value;
  let timeinterval2 = setInterval(function(){
  let t2 = Date.parse(deadline2) - (new Date()).getTime();
    let days2 = Math.floor( t2/(1000*60*60*24) );  
    let hours2 = Math.floor( (t2/(1000*60*60)) % 24);
    let minutes2 = Math.floor( (t2/1000/60) % 60);
    let seconds2 = Math.floor( (t2/1000) % 60 );
      clock2.innerHTML = 'It is only ' + days2 +' days ' + hours2 + ' hrs  ' + minutes2 + ' mins & ' + seconds2 + ' secs until your next trip! <br> Let\'s start preparing!';
            if(t2.total<=0){
        clearInterval(timeinterval2);
    }
}, 1000);

}





