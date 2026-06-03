moveButtons();

addOnChangeToStoreSelectionRadioButtons();

includeTaxWarning(); // CHANGE HERE function is optional

includeTaxWarningConfirmationPage(); // CHANGE HERE function is optional

headerWrap();

changeDropDownTitleStyles();

changeCartShipMethod();

customizeErrorMessage();

checkoutButton();

//changeRequestLink(); // CHANGE HERE function is optional

getRidOfOnlineText();

editSigninMessage();

//changeSpecialOrderLink(); // CHANGE HERE function is optional

//changePromoMenuLinks(); // CHANGE HERE function is optional

//hideInvoiceFields(); // CHANGE HERE function is optional

//hideUseDeliveryAddressButton(); // CHANGE HERE function is optional

changeSelectAddressButtonLabelAndColumnHeading();

//hideAddressTableWhenEmpty(); // CHANGE HERE function is optional

//giveAlertToSelectAddress(); // CHANGE HERE function is optional

//hideStockColumnOnCartPage(); // CHANGE HERE function is optional

//changeConfirmationMessages(); // CHANGE HERE function is optional

changeModalButtonColor();

//changeLowStockWarningModal(); // CHANGE HERE function is optional

addSpecialText()

enableAddressFieldsInCheckout();

// HideNameOnDeliveryAddress()

FixLinerFeetProductCard()

MoveBackButtonProductpage()

MoveProductCodeProductpage()

hideCallOffOrders()

MoveShortDescriptionProductPage()

MakeContactTelephoneRequired()

addCheckoutButtonWhenCartHasItem()

ChangeButtonColourAtFinalConfirmation()

// CreateMessageAlertAtMakeAPayment()

// GetAllDeliveryAddressInfo() //Uncomment if needed

// MoveEmailAddressFieldCheckout() //Uncomment if needed

CheckEmailAddressFieldCheckout()

for (var i = 0; i < 1; i++) {
    var resetMessageContainerChildChild = document.getElementById(
        "ctl00_PageBody_ResetPasswordButton"
    );
    if (!resetMessageContainerChildChild) {
        break;
    }
    var resetMessageContainerChild = resetMessageContainerChildChild.parentNode;
    if (!resetMessageContainerChild) {
        break;
    }
    var resetMessageContainer = resetMessageContainerChild.parentNode;
    if (!resetMessageContainer) {
        break;
    }
    var resetMessageDiv = resetMessageContainer.getElementsByTagName("div")[0];
    // resetMessageDiv.innerHTML =
    //     "Please enter your User name (your Yoder account code) and we will email you a new password to the address set on your account."; // CHANGE HERE This is the message that will appear when resetting your password
}

for (var i = 0; i < 1; i++) {
    //add a default amount to any editable field
    var productCardPanel = document.getElementById(
        "ctl00_PageBody_ProductGroupStandardPanel"
    );
    if (!productCardPanel) {
        break;
    }
    var allInputFieldsForQuantity = productCardPanel.getElementsByClassName(
        "riTextBox riEnabled"
    );
    if (!allInputFieldsForQuantity) {
        break;
    }
    for (var i = 0; i < allInputFieldsForQuantity.length; i++) {
        allInputFieldsForQuantity[i].setAttribute("value", "1");
    }
}

for (var i = 0; i < 1; i++) {
    hideTallyInputFields();
}

for (var i = 0; i < 1; i++) {
    var allATags = document.getElementsByTagName("a");
    for (var i = 0; i < allATags.length; i++) {
        if (allATags[i].innerHTML === "Add/Tally") {
            allATags[i].innerHTML = "Specify Lengths";
        }
    }
}

for (var i = 0; i < 1; i++) {
    var theTableField = document.getElementById(
        "ctl00_PageBody_productDetail_ctl00_FurtherInfoTable"
    );

    if (!theTableField) {
        break;
    }
    theTableField.style.display = "none";
}

for (var i = 0; i < 1; i++) {
    var list = document.getElementsByClassName("menu-t1");
    if (!list) {
        break;
    }
    var liToAdd = document.createElement("li");
    var button = document.createElement("a");
    button.setAttribute("class", "nav-link");
    button.setAttribute("href", "Products.aspx");
    button.setAttribute("title", "Products");
    button.innerHTML = "Products";
    liToAdd.appendChild(button);
    var homeButton = document.getElementById("ctl00_MainMenu_HomeLinkItem");
    if (!homeButton) {
        break;
    }
    homeButton.parentNode.insertBefore(liToAdd, homeButton.nextSibling);
}

for (var i = 0; i < 1; i++) {
    var menuItem = document.getElementsByClassName("nav-link text-nowrap")[0];
    if (!menuItem) {
        break;
    }
    menuItem.innerHTML = "My Account";
}

for (var i = 0; i < 1; i++) {
    var backButton = document.getElementById("ctl00_PageBody_BackButton");
    if (backButton) {
        backButton.addEventListener("click", goBack);
    }
}

var MSLegacy = checkForIE();

if (MSLegacy) {
    var insert = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.setAttribute(
        "src",
        "https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2"
    );
    insert.appendChild(script);
    console.log("IE found, adding ponyfill.");
    setTimeout(callCSSVars, 6000);
    //$(document).ready(callCSSVars);
}
window.onload = function setSignInTo48Products() {
    var signInCheck = document.getElementById('ctl00_MainMenu_SignInItem')

    var signOutCheck = document.getElementById('ctl00_MainMenu_SignOutItem')
    var products = document.getElementById("ctl00_MainMenu_HomeLinkItem").parentElement.children[1];
    if (signInCheck) {
        signInCheck.children[0].href = "https://wt.goyoders.com/Products.aspx?pageIndex=0&groupIndex=0&itemsPerPage=48"

    }
    if (signOutCheck) {
        signOutCheck.children[0].href = "https://wt.goyoders.com/SignIn.aspx?SignOut=1&&Redirect=https%3a%2f%2fwt.goyoders.com%2fProducts.aspx%3fpageIndex%3d0%26groupIndex%3d0%26itemsPerPage%3d48"

    }
    if (products) {
        products.children[0].href = "https://wt.goyoders.com/Products.aspx?pageIndex=0&groupIndex=0&itemsPerPage=48"

    }
}


//document.querySelectorAll('[href="Products.aspx"]')[0].parentElement.style.display = "none"


for (var i = 0; i < 1; i++) {
    var checkoutSpacer = document.querySelector('#ctl00_PageBody_DeliveryAddress_spacerDiv');
    if (checkoutSpacer) {
        var checkoutSpacerDivs = checkoutSpacer.querySelectorAll('div');
        for (var j = 0; j < checkoutSpacerDivs.length; j++) {
            checkoutSpacerDivs[j].style.backgroundColor = 'whitesmoke';
        }
    }
}

var currentURL = window.location.href;
if (currentURL.indexOf('AccountPayment_r.aspx') > 0 && document.getElementById("ctl00_PageBody_BillingAddressTextBox")) {

    if ((document.getElementById("ctl00_PageBody_BillingAddressTextBox").value == '' || document.getElementById("ctl00_PageBody_PostalCodeTextBox").value == '') && document.getElementById("ctl00_PageBody_RadioButton_PayByCredit").checked == true) {
        alert("Please note that if paying by credit card, you must enter the card's Billing Address and Zip Code.")
        document.getElementById("ctl00_PageBody_MakePayment").style.pointerEvents = 'none'
        document.getElementById("ctl00_PageBody_MakePayment").style.backgroundColor = "#6b6b6b"
        document.getElementById("ctl00_PageBody_MakePayment").style.borderColor = "#6b6b6b"

        if (document.getElementById("ctl00_PageBody_BillingAddressTextBox").value == '') {
            var errorMessage = document.createElement("span")
            errorMessage.style.color = "red"
            errorMessage.innerHTML = "Please enter a valid Billing Address."
            document.getElementById("ctl00_PageBody_BillingAddressTextBox").parentElement.appendChild(errorMessage)
        }



    }
}