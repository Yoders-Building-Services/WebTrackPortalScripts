/***
 *     .----------------.  .----------------.  .----------------.  .-----------------. .----------------.  .----------------.  .----------------.  .----------------.
 *    | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
 *    | |    _______   | || |  _________   | || |      __      | || | ____  _____  | || |  ________    | || |      __      | || |  _______     | || |  ________    | |
 *    | |   /  ___  |  | || | |  _   _  |  | || |     /  \     | || ||_   \|_   _| | || | |_   ___ `.  | || |     /  \     | || | |_   __ \    | || | |_   ___ `.  | |
 *    | |  |  (__ \_|  | || | |_/ | | \_|  | || |    / /\ \    | || |  |   \ | |   | || |   | |   `. \ | || |    / /\ \    | || |   | |__) |   | || |   | |   `. \ | |
 *    | |   '.___`-.   | || |     | |      | || |   / ____ \   | || |  | |\ \| |   | || |   | |    | | | || |   / ____ \   | || |   |  __ /    | || |   | |    | | | |
 *    | |  |`\____) |  | || |    _| |_     | || | _/ /    \ \_ | || | _| |_\   |_  | || |  _| |___.' / | || | _/ /    \ \_ | || |  _| |  \ \_  | || |  _| |___.' / | |
 *    | |  |_______.'  | || |   |_____|    | || ||____|  |____|| || ||_____|\____| | || | |________.'  | || ||____|  |____|| || | |____| |___| | || | |________.'  | |
 *    | |              | || |              | || |              | || |              | || |              | || |              | || |              | || |              | |
 *    | '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
 *     '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'
 *
 *    This section stores all of the "standard" scripts that are implemented on the majority of WebTrack client stores
 */

function checkForIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }
    var trident = ua.indexOf("Trident/");
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf("rv:");
        return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }
    // all the other browsers
    return false;
}

function callCSSVars() {
    cssVars({
        include: "[data-include]",
    });
}

function moveButtons() {
    //get the two buttons that we want to move
    var selectButton = document.getElementById(
        "ctl00_PageBody_CustomerAddressSelector_SelectAddressLinkButton"
    );
    var useButton = document.getElementById(
        "ctl00_PageBody_CopyDeliveryAddressLinkButton"
    );

    if (!selectButton) {
        return;
    }

    //make some arrays for the attributes and the attribute values
    var selectButtonAttributeNames = [],
        selectButtonAttributeValues = [];
    var useButtonAttributeNames = [],
        useButtonAttributeValues = [];

    //loop through the buttons and get the attribute names and values
    for (var i = 0; i < selectButton.attributes.length; i++) {
        var attribute = selectButton.attributes[i];
        selectButtonAttributeNames.push(attribute.nodeName);
        selectButtonAttributeValues.push(attribute.nodeValue);
    }
    for (var i = 0; i < useButton.attributes.length; i++) {
        var attribute = useButton.attributes[i];
        useButtonAttributeNames.push(attribute.nodeName);
        useButtonAttributeValues.push(attribute.nodeValue);
    }

    //make the new buttons
    var newSelectButton = document.createElement("a");
    var newUseButton = document.createElement("a");

    //create and add the button text
    var spanOuterForNewSelectButton = document.createElement("span");
    spanOuterForNewSelectButton.innerHTML = "Select Delivery Address";
    newSelectButton.appendChild(spanOuterForNewSelectButton);
    newSelectButton.style.marginLeft = "1%";
    newSelectButton.style.marginRight = "19%";
    newSelectButton.style.marginTop = "3%";
    newSelectButton.style.marginBottom = "3%";
    var spanTag = newSelectButton.getElementsByTagName("span")[0];
    spanTag.style.padding = "0 30px";

    var spanOuterForNewUseButton = document.createElement("span");
    spanOuterForNewUseButton.innerHTML = "Use Delivery Address For Invoicing";
    newUseButton.appendChild(spanOuterForNewUseButton);
    newUseButton.style.marginLeft = "1%";
    newUseButton.style.marginTop = "3%";
    newUseButton.style.marginBottom = "3%";
    var useSpanTag = newUseButton.getElementsByTagName("span")[0];
    useSpanTag.style.padding = "0 30px";

    //hide the old buttons
    selectButton.style.display = "none";
    useButton.style.display = "none";

    //add the button attributes to the new buttons
    for (var i = 0; i < selectButtonAttributeNames.length; i++) {
        newSelectButton.setAttribute(
            selectButtonAttributeNames[i],
            selectButtonAttributeValues[i]
        );
    }
    for (var i = 0; i < useButtonAttributeNames.length; i++) {
        newUseButton.setAttribute(
            useButtonAttributeNames[i],
            useButtonAttributeValues[i]
        );
    }

    //place the new buttons at the top of the page
    var pageContainer = document.getElementsByClassName("container")[0];
    var pageContainerDivs = pageContainer.getElementsByTagName("div");
    var newColDiv = document.createElement("div");
    newColDiv.setAttribute("class", "row");
    newColDiv.appendChild(newSelectButton);
    newColDiv.appendChild(newUseButton);
    newColDiv.style.marginBottom = "1%";
    pageContainer.insertBefore(newColDiv, pageContainer.childNodes[7]);
}

function addOnChangeToStoreSelectionRadioButtons() {
    var pickupRadioButton = document.getElementById(
        "ctl00_PageBody_SaleTypeSelector_rdbCollectLater"
    );
    if (!pickupRadioButton) {
        return;
    }
    var deliveryRadioButton = document.getElementById(
        "ctl00_PageBody_SaleTypeSelector_rdbDelivered"
    );

    pickupRadioButton.setAttribute(
        "onchange",
        "javascript:__doPostBack('ctl00$PageBody$CopyDeliveryAddressLinkButton','')"
    );
    deliveryRadioButton.setAttribute(
        "onchange",
        "javascript:__doPostBack('ctl00$PageBody$CopyDeliveryAddressLinkButton','')"
    );
}

function includeTaxWarning() {
    var taxTableChild = document.getElementById(
        "ctl00_PageBody_CartSummary_TaxTotals"
    );
    if (!taxTableChild) {
        return;
    }
    var taxTable = taxTableChild.parentNode;
    var taxWarning = document.createElement("tr");
    taxWarning.innerHTML =
        "NOTE: Tax and Total amounts may change</br> based on delivery destination ($11 fuel surcharge).";
    taxTable.appendChild(taxWarning);
}

function includeTaxWarningConfirmationPage() {
    var taxTableChild = document.getElementById(
        "ctl00_PageBody_ShoppingCartSummaryTableControl_VatSummaryRow"
    );
    if (!taxTableChild) {
        return;
    }
    var taxTable = taxTableChild.parentNode;
    var taxWarning = document.createElement("tr");
    taxWarning.innerHTML =
        "NOTE: Tax and Total amounts may change</br> based on delivery destination ($11 fuel surcharge).";
    taxTable.appendChild(taxWarning);
}

function headerWrap() {
    var x = document.getElementsByClassName("rsmLink");
    if (!x) {
        return;
    }
    for (var i = 0; i < x.length; i++) {
        x[i].style.whiteSpace = "normal";
    }
}

function changeDropDownTitleStyles() {
    var x = document.getElementsByClassName("ProductGroupMenuHeader");
    if (!x) {
        return;
    }
    for (var i = 0; i < x.length; i++) {
        x[i].style.color = "#fff";
        x[i].style.paddingLeft = "5px";
        x[i].style.paddingTop = "5px";
        x[i].style.paddingBottom = "5px";
        x[i].style.fontSize = "15px";
        x[i].style.backgroundColor =
            "#f7931e"; /* CHANGE HERE the color */
    }
}

/* Change the ship method selection label */
function changeCartShipMethod() {
    var x = document.getElementsByClassName("SaleTypeSelector")[0];
    if (!x) {
        return;
    }
    var y = x.getElementsByClassName("radiobutton")[1];
    var z = (y.getElementsByTagName("label")[0].innerHTML = "In-Store Pickup");
}

function customizeErrorMessage() {
    var form = document.getElementsByTagName("FORM");
    if (!form) {
        return;
    }
    var divSiteContent = form[0].getElementsByClassName("site-content");
    var divMainLayoutRow = divSiteContent[0].getElementsByClassName(
        "container-fluid"
    );
    var divCol = divMainLayoutRow[0].getElementsByClassName("col");
    var pageTitle = divCol[0].getElementsByTagName("H2")[0];
    if (!pageTitle) {
        return;
    }
    if (pageTitle.innerHTML.indexOf("An error occurred") !== -1) {
        var divHide = divCol[0].getElementsByClassName("mainHeader");
        if (divHide === null) {
            divHide[0].style.display = "none";
        }
        var pTags = divCol[0].getElementsByTagName("P");
        var h2Tags = divCol[0].getElementsByTagName("H2");
        h2Tags[0].style.color = "BACKGROUND-COLOR";
        h2Tags[0].style.paddingTop = "20px";
        pTags[1].innerHTML = "";
        pTags[1].style.fontSize = "14px";
        pTags[1].style.color = "BACKGROUND-COLOR";
        pTags[1].innerHTML =
            'Please call <a href="tel:+8649723003">864.972.3003</a> or contact us at <a href="https://goyoders.com/" target="_blank" >goyoders.com</a> for assistance.'; // CHANGE HERE the links
    }
}

function checkoutButton() {
    var x = document.getElementById("ctl00_PageBody_PlaceOrderButtonTop");
    if (!x) {
        return;
    }
    x.getElementsByTagName("span")[0].innerHTML = "Place Order/Quote";
    var y = document.getElementById("ctl00_PageBody_PlaceOrderButton");
    y.getElementsByTagName("span")[0].innerHTML = "Place Order/Quote";
}

function hideTallyWidthHeightTable() {
    var theTableField = document.getElementById(
        "ctl00_PageBody_productDetail_ctl00_FurtherInfoTable"
    );
    if (!theTableField) {
        return;
    }

    theTableField.style.display = "none";
}

function changeSelectAddressButtonLabelAndColumnHeading() {
    //button
    var selectButton = document.getElementById(
        "ctl00_PageBody_CustomerAddressSelector_SelectAddressLinkButton"
    );
    if (!selectButton) {
        return;
    }
    var spanTag = selectButton.getElementsByTagName("span")[0];
    spanTag.innerHTML = "Select Job Account Address";

    //header
    var addressColumn = document.getElementById(
        "ctl00_PageBody_DeliveryAddress_ContactTelephoneRow"
    ).parentNode;
    var headerLabel = addressColumn.getElementsByTagName("div")[0];
    var deliveryRadioButton = document.getElementById(
        "ctl00_PageBody_SaleTypeSelector_rbDelivered"
    );
    console.log(deliveryRadioButton.checked)
    if (deliveryRadioButton.checked) {
        headerLabel.innerHTML = "Jobsite Delivery Address";
        document.getElementById("ctl00_PageBody_CustomerAddressSelector_SelectAddressLinkButton").innerHTML = "Select Jobsite Delivery Address";
    } else {
        headerLabel.innerHTML = "Job Account Address";
        document.getElementById("ctl00_PageBody_CustomerAddressSelector_SelectAddressLinkButton").innerHTML = "Select Job Account Address";
    }
}

function hideTallyInputFields() {
    //hide any non-editable field
    setTimeout(hideTheFields, 50);
}

function hideTheFields() {
    var allInputFieldsForQuantityDisabled = document.getElementsByClassName(
        "riSingle RadInput RadInput_MetroTouch RadInputDisabled"
    );
    if (!allInputFieldsForQuantityDisabled) {
        return;
    }
    for (var i = 0; i < allInputFieldsForQuantityDisabled.length; i++) {
        allInputFieldsForQuantityDisabled[i].parentNode.style.display = "none";
    }
}

function goBack() {
    window.history.back();
}

/***
 *     .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------.
 *    | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
 *    | |     ______   | || | _____  _____ | || |    _______   | || |  _________   | || |     ____     | || | ____    ____ | |
 *    | |   .' ___  |  | || ||_   _||_   _|| || |   /  ___  |  | || | |  _   _  |  | || |   .'    `.   | || ||_   \  /   _|| |
 *    | |  / .'   \_|  | || |  | |    | |  | || |  |  (__ \_|  | || | |_/ | | \_|  | || |  /  .--.  \  | || |  |   \/   |  | |
 *    | |  | |         | || |  | '    ' |  | || |   '.___`-.   | || |     | |      | || |  | |    | |  | || |  | |\  /| |  | |
 *    | |  \ `.___.'\  | || |   \ `--' /   | || |  |`\____) |  | || |    _| |_     | || |  \  `--'  /  | || | _| |_\/_| |_ | |
 *    | |   `._____.'  | || |    `.__.'    | || |  |_______.'  | || |   |_____|    | || |   `.____.'   | || ||_____||_____|| |
 *    | |              | || |              | || |              | || |              | || |              | || |              | |
 *    | '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
 *     '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'
 *
 *    This section contains all of the code that may be needed on a client store but is not included on standard implementation.
 */

function changeRequestLink() {
    var allATags = document.getElementsByTagName("A");
    if (!allATags) {
        return;
    }
    for (var i = 0; i < allATags.length; i++) {
        if (allATags[i].innerText === "Request Access") {
            allATags[i].setAttribute(
                "href",
                ""
            );
        }
    }
}

function getRidOfOnlineText() {
    var containingDiv = document.getElementById(
        "ctl00_PageBody_ProductGroupStandardPanel"
    );
    if (!containingDiv) {
        return;
    }
    var divDFlex = containingDiv.getElementsByClassName("d-flex")[1];
    if (!divDFlex) {
        return;
    }
    var divToHideTop = divDFlex.getElementsByClassName("m-1")[2];
    if (!divToHideTop) {
        return;
    }
    divToHideTop.style.display = "none";
    var divDFlex2 = containingDiv.getElementsByClassName("d-flex")[2];
    var divToHideBottom = divDFlex2.getElementsByClassName("m-1")[2];
    divToHideBottom.style.display = "none";
}

function editSigninMessage() {
    x = document.getElementsByClassName("SigninMessage")[0];
    if (!x) {
        return;
    }
    x.innerHTML =
        "Details of your Order/Quote may have changed since signing back in.  Please review items and click on ‘Place Order/Quote’ to complete the transaction.";
}

function changeSpecialOrderLink() {
    //get all the 'container' elements on the page
    var containers = document.getElementsByClassName("Container");
    if (!containers) {
        return;
    }

    //boolean to enter second section of code
    var updateLinks = false;

    for (var i = 0; i < containers.length; i++) {
        //look at all containers on the page
        var containerATags = containers[i].getElementsByTagName("a");
        //boolean to enter second section of code
        var updateLinks = false;

        // search through looking for an 'a' tag that contains 'SPECIAL ORDER'
        for (var j = 0; j < containerATags.length; j++) {
            //found it!
            if (containerATags[j].innerHTML.indexOf("SPECIAL ORDER") !== -1) {
                //set boolean value to enter into section to update image and footer links
                updateLinks = true;
                return;
            }
        }

        if (updateLinks === true) {
            //Update all 'a' tag links
            for (var j = 0; j < containerATags.length; j++) {
                //Update title link while we are here
                containerATags[j].href =
                    "";

                //no one likes a link that doesn't open in a new tab
                containerATags[j].setAttribute("target", "_blank");
            }
        }

        //change all promo menu links to the contact form link
        var rsmLinks = document.getElementsByClassName("rsmLink");
        for (var c = 0; c < rsmLinks.length; c++) {
            if (rsmLinks[c].innerHTML.includes("SPECIAL ORDER")) {
                rsmLinks[c].href =
                    "";

                //no one likes a link that doesn't open in a new tab
                rsmLinks[c].setAttribute("target", "_blank");
            }
        }
    }
}

function changePromoMenuLinks() {
    //change all promo menu links to the contact form link
    var rsmLinks = document.getElementsByClassName("rsmLink");
    if (!rsmLinks) {
        return;
    }
    for (var c = 0; c < rsmLinks.length; c++) {
        if (rsmLinks[c].innerHTML.includes("SPECIAL ORDER")) {
            rsmLinks[c].href =
                "";

            //no one likes a link that doesn't open in a new tab
            rsmLinks[c].setAttribute("target", "_blank");
        }
    }
}

function hideInvoiceFields() {
    var invoiceColumnChild = document.getElementById(
        "ctl00_PageBody_InvoiceAddress_EmailAddressRow"
    );
    if (!invoiceColumnChild) {
        return;
    }
    var invoiceColumn = invoiceColumnChild.parentNode;
    if (!invoiceColumn) {
        return;
    }

    invoiceColumn.style.display = "none";
}

function hideUseDeliveryAddressButton() {
    var theButton = document.getElementById(
        "ctl00_PageBody_CopyDeliveryAddressLinkButton"
    );
    if (!theButton) {
        return;
    }
    theButton.style.display = "none";
}

function hideAddressTableWhenEmpty() {
    var addressColumnChildChild = document.getElementById(
        "ctl00_PageBody_DeliveryAddress_ContactNameTitleLiteral"
    );
    if (!addressColumnChildChild) {
        return;
    }
    var addressColumnChild = addressColumnChildChild.parentNode;
    if (!addressColumnChild) {
        return;
    }
    var addressColumn = addressColumnChild.parentNode;
    if (!addressColumn) {
        return;
    }
    var allRows = addressColumn.getElementsByTagName("div");
    var addressLine1 = document.getElementById(
        "ctl00_PageBody_DeliveryAddress_AddressLine1"
    );
    if (addressLine1.value === "") {
        for (var i = 0; i < 33; i++) {
            allRows[i].style.display = "none";

            var anyChildSpanTags = allRows[i].getElementsByTagName("span");
            for (var c = 0; c < anyChildSpanTags.length; c++) {
                anyChildSpanTags[c].style.display = "none";
            }
            var anyChildInputTags = allRows[i].getElementsByTagName("input");
            for (var c = 0; c < anyChildInputTags.length; c++) {
                anyChildInputTags[c].style.display = "none";
            }
            var anyChildLabelTags = allRows[i].getElementsByTagName("label");
            for (var c = 0; c < anyChildLabelTags.length; c++) {
                anyChildLabelTags[c].style.display = "none";
            }
            var anyChildSelectTags = allRows[i].getElementsByTagName("select");
            for (var c = 0; c < anyChildSelectTags.length; c++) {
                anyChildSelectTags[c].style.display = "none";
            }
        }
    }
}

function sendAlertIfIncomplete() {
    var addressLine1 = document.getElementById(
        "ctl00_PageBody_DeliveryAddress_AddressLine1"
    );

    if (!addressLine1) {
        return;
    }

    if (addressLine1.value === "") {
        alert("Please make sure to select a delivery or job account address.");
    }
}

function giveAlertToSelectAddress() {
    var continueButtonTop = document.getElementById(
        "ctl00_PageBody_ContinueButton1"
    );
    if (!continueButtonTop) {
        return;
    }
    var continueButtonBottom = document.getElementById(
        "ctl00_PageBody_ContinueButton2"
    );

    continueButtonTop.addEventListener("click", sendAlertIfIncomplete);
    continueButtonBottom.addEventListener("click", sendAlertIfIncomplete);
}

function hideStockColumnOnCartPage() {
    var allH5Elements = document.getElementsByTagName("h5");

    for (var i = 0; i < allH5Elements.length; i++) {
        if (allH5Elements[i].innerHTML === "Stock") {
            allH5Elements[i].style.display = "none";
        }
    }

    var shoppingCartPanel = document.getElementById(
        "ctl00_PageBody_ShoppingCartDetailPanel"
    );
    if (!shoppingCartPanel) {
        return;
    }
    var itemLines = shoppingCartPanel.getElementsByClassName(
        "row shopping-cart-item"
    );
    for (var j = 0; j < itemLines.length; j++) {
        var dFlexElement = itemLines[j].getElementsByClassName("d-flex")[0];
        var allColumns = dFlexElement.getElementsByClassName("col-12 col-sm-6");

        for (var i = 0; i < allColumns.length; i++) {
            var allDivElements = allColumns[i].getElementsByTagName("div");

            //check if they are on IE
            var MSLegacy = checkForIE();

            if (MSLegacy) {
                for (var c = 0; c < allDivElements.length; c++) {
                    if (allDivElements[c].innerHTML.indexOf("In stock:") !== -1) {
                        allColumns[i].style.display = "none";
                    }
                }
            } else {
                for (var c = 0; c < allDivElements.length; c++) {
                    if (allDivElements[c].innerHTML.includes("In stock:")) {
                        allColumns[i].style.display = "none";
                    }
                }
            }
        }
    }
}

function changeConfirmationMessages() {
    //get the title text
    var titleText = document.getElementById(
        "ctl00_PageBody_SuccessfulOrderResultTitle_HeaderText"
    );
    if (!titleText) {
        return;
    }
    var bodyText = document.getElementById("CartResponseMessage");
    if (!bodyText) {
        return;
    }

    //see if it is for an quote
    if (titleText.innerHTML === "Quote Results") {
        //set the title to the proper quote text
        titleText.innerHTML = "QUOTE CONFIRMATION";
        titleText.style.fontSize = "18px";
        titleText.style.fontWeight = "bold";

        //change the large text color
        var largeText = bodyText.getElementsByTagName("h3")[0];
        largeText.style.color = "#703a00";

        //set the body text to the proper text
        var bodyTextPTags = bodyText.getElementsByTagName("p");
        bodyTextPTags[0].innerHTML =
            "Your quote has been successfully submitted to our team of online building material specialists.";
        bodyTextPTags[2].innerHTML =
            "You will need this on hand if you contact us regarding this order.";
        var additionalParagraph1 = document.createElement("p");
        additionalParagraph1.innerHTML =
            "We may contact you to confirm the details of your quote and to discuss delivery logistics or pickup options.</br><i>PLEASE NOTE, not all locations stock the same materials, so please wait for confirmation from our team before visiting us for pickup.</i>";
        bodyText.appendChild(additionalParagraph1);
        var additionalParagraph2 = document.createElement("p");
        additionalParagraph2.innerHTML =
            "Our hours of operation are Monday – Friday 8am – 4pm and Saturday from 8am – 12pm. Our Garfield & Newark locations are closed on Saturday.";
        bodyText.appendChild(additionalParagraph2);
    }

    //otherwise it is an order confirmation
    else if (titleText.innerHTML === "Order Results") {
        //set the title to the proper order text
        titleText.innerHTML = "ORDER CONFIRMATION";
        titleText.style.fontSize = "18px";
        titleText.style.fontWeight = "bold";

        //change the large text color
        var largeText = bodyText.getElementsByTagName("h3")[0];
        largeText.style.color = "#703a00";

        //set the body text to the proper text
        var bodyTextPTags = bodyText.getElementsByTagName("p");
        bodyTextPTags[0].innerHTML =
            "Your order has been successfully submitted to our team of online building material specialists.";
        bodyTextPTags[2].innerHTML =
            "You will need this on hand if you contact us regarding this order.";
        var additionalParagraph1 = document.createElement("p");
        additionalParagraph1.innerHTML =
            "We will contact you to confirm your order to discuss delivery logistics or to let you know the time that your order will be available for pickup.</br><i>PLEASE NOTE, not all locations stock the same materials, so please wait for confirmation from our team before visiting us for pickup.</i>";
        bodyText.appendChild(additionalParagraph1);
        var additionalParagraph2 = document.createElement("p");
        additionalParagraph2.innerHTML =
            "Our hours of operation are Monday – Friday 8am – 4pm and Saturday from 8am – 12pm. Our Garfield & Newark locations are closed on Saturday.";
        bodyText.appendChild(additionalParagraph2);
    }
}

function wrapperFunction() {
    setTimeout(stockButton, 500);
}

function changeModalButtonColor() {
    var cards = document.getElementById(
        "ctl00_PageBody_ProductGroupStandardPanel"
    );
    if (!cards) {
        return;
    }
    var cardSets = cards.getElementsByClassName("CardSet");
    for (var c = 0; c < cardSets.length; c++) {
        var buttons = cardSets[c].getElementsByClassName("epi-button");
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].innerHTML === "Stock") {
                buttons[i].addEventListener("click", wrapperFunction);
            }
        }
    }
}

function stockButton() {
    var iframe = document.getElementsByTagName("IFRAME")[0];
    if (!iframe) {
        return;
    }
    var x = iframe.contentDocument || iframe.contentWindow.document;
    var y = x.getElementsByClassName("row")[0];
    if (!y) {
        return;
    }
    var z = x.getElementsByClassName("row")[3];
    var yy = y.getElementsByClassName("col-12")[0];
    var yyy = yy.getElementsByClassName("submit-button-panel ml-auto")[0];
    var yyyy = yyy.getElementsByClassName("epi-button");
    for (var i = 0; i < yyyy.length; i++) {
        yyyy[i].style.backgroundColor = "#f7931e"; // CHANGE HERE the color (can't be var() because it is in an iframe)
        yyyy[i].style.borderColor = "#f7931e"; // CHANGE HERE the color (can't be var() because it is in an iframe)
    }
    var zz = z.getElementsByClassName("col-12")[0];
    var zzz = zz.getElementsByClassName("submit-button-panel ml-auto")[0];
    var zzzz = zzz.getElementsByClassName("epi-button");
    for (var i = 0; i < zzzz.length; i++) {
        zzzz[i].style.backgroundColor = "#f7931e"; // CHANGE HERE the color (can't be var() because it is in an iframe)
        zzzz[i].style.borderColor = "#f7931e"; // CHANGE HERE the color (can't be var() because it is in an iframe)
    }
}

function changeLowStockWarningModal() {
    //get the modal (array because we can only search by class)
    var allModals = document.getElementsByClassName("modal-content");
    if (!allModals) {
        return;
    }
    //variable to set if there is a shortage
    var isShortage = false;

    //change the title
    var headerText = document.getElementById("exampleModalLabel");
    if (!headerText) {
        return;
    }
    if (headerText.innerHTML.indexOf("Warning") !== -1) {
        headerText.innerHTML = "Confirmation";
    }

    //now select the body of the modal
    var body = allModals[0].getElementsByClassName("modal-body")[0];

    //check if there is a stock shortage warning
    var allTextSections = body.getElementsByClassName("text-center");
    var firstTextSection = body.getElementsByClassName("text-center")[0];
    if (!firstTextSection) {
        return;
    }
    if (firstTextSection.innerHTML.indexOf("stock shortage") !== -1) {
        //hide all of the text in the body section
        for (var c = 0; c < allTextSections.length; c++) {
            allTextSections[c].style.display = "none";
        }
        isShortage = true;
    }

    //if there is a stock shortage, hide the stock level table data
    if (isShortage) {
        //get the table
        var table = body.getElementsByTagName("table");

        table[0].innerHTML =
            "Have you verified that the products, quantities and delivery/pickup location are accurate?";

        table[0].style.marginBottom = "2%";
    }

    var continueButton = document.getElementById("ctl00_PageBody_YesButton");
    var cancelButton = continueButton.nextElementSibling;

    var continueButtonSpan = continueButton.getElementsByTagName("span");
    continueButtonSpan[0].innerHTML = "Yes - Continue";
    cancelButton.innerHTML = "No - Review";
}


function addSpecialText() {


    var divNode1 = document.createElement("div");
    var divNode4 = document.createElement("div");
    var imgNode2 = document.createElement("img");
    imgNode2.src = "https://yoders-building-services.github.io/WebTrackPortalScripts/images/output-onlinepngtools.png"
    var aNode = document.createElement("a");

    divNode4.onclick = function() { window.location = "https://wt.goyoders.com/AccountPayment_r.aspx" };
    // divNode4.onclick = "window.location = 'https://tawportal.epicoranywhere.com/AccountPayment_r.aspx'"
    aNode.innerHTML = "Make a payment online"
    divNode4.appendChild(aNode)
    divNode4.appendChild(imgNode2)

    divNode1.id = "SpecialTextDiv"
    divNode4.id = "SpecialText"

    divNode1.appendChild(divNode4);
    var headerBody = document.getElementById("PageHeaderDiv")
    headerBody.appendChild(divNode1)
}

function enableAddressFieldsInCheckout() {
    var currentURL = window.location.href;

    var placeOrderQuoteButton = document.getElementById('#ctl00_PageBody_DeliveryAddress_Country');
    if (placeOrderQuoteButton) {
        return;
    }
    if (currentURL.indexOf('ShoppingCart.aspx') > 0 && document.getElementById("ctl00_PageBody_DeliveryAddress_Country")) {
        var addressFields = document.getElementsByClassName("container")[0].children[4].children[0].querySelectorAll(".epi-form-group-checkout");
        if (addressFields) {
            for (var i = 0; i < addressFields.length; i++) {
                // console.log(addressFields[i].children[1].children[0].removeAttribute("disabled"))

                if (addressFields[i].children[1].children[0] != undefined)
                    addressFields[i].children[1].children[0].removeAttribute("disabled");
            }
        }
    }
}

function FixLinerFeetProductCard() {
    if (document.querySelector('#PriceRow')) {
        var priceField = document.querySelectorAll('#PriceRow')
        var quanityField = document.querySelectorAll('#QuantityRow')



        for (x in quanityField) {

            if (quanityField[x].className == "productCardTextRow") {
                console.log(quanityField[x])
                console.log(quanityField[x].children[0])
                if (quanityField[x].children[0].children[0].children[0].disabled == true) {
                    priceField[x].style = "height:55px"
                }

            }
        }


    }
}

function MoveBackButtonProductpage() {

    var currentURL = window.location.href;
    if (currentURL.indexOf('ProductDetail.aspx') > 0 && document.getElementById("ctl00_PageBody_divBackButton")) {
        var backbutton = document.getElementById("ctl00_PageBody_divBackButton")
        var parentRows = document.getElementsByClassName("bodyFlexContainer")[0]

        backbutton.className = "flex-shrink-0 flex-grow-1 text-left pl-2"
        backbutton.style = "margin-top: 20px;margin-bottom: 20px;"

        parentRows.appendChild(backbutton)
    }

}

function MoveProductCodeProductpage() {

    var currentURL = window.location.href;
    if (currentURL.indexOf('ProductDetail.aspx') > 0 && document.getElementsByClassName("bodyFlexContainer")[0]) {

        var productCode = document.getElementsByClassName("bodyFlexContainer")[0].children[0].children[0]

        productCode.style = "text-align:left;"

    }

}


function TestMoveshortDescription() {

    var currentURL = window.location.href;
    if (currentURL.indexOf('ProductDetail.aspx') > 0 && document.getElementsByClassName("productDescriptionOnThisPageFull")[0] && document.getElementsByClassName("bodyFlexContainer")[0].children[0].children[0].innerHTML.trim() == `Product Code: 131041`) {
        document.getElementsByClassName("productDescriptionOnThisPageFull")[0].innerHTML = "3 1/2 X 9 1/2 X 16' TIMBERSTRAND LSL 1.55E | " + document.getElementsByClassName("productDescriptionOnThisPageFull")[0].innerHTML

    }

}

function MoveShortDescriptionProductPage() {

    var currentURL = window.location.href;
    if (currentURL.indexOf('ProductDetail.aspx') > 0 && document.getElementsByClassName("productDescriptionOnThisPageFull")[0]) {
        if (document.getElementsByClassName("productDescriptionOnThisPageFull")[0].innerHTML.indexOf("|") != -1) {
            var shortDesc = document.getElementsByClassName("productDescriptionOnThisPageFull")[0].innerHTML.substring(0, document.getElementsByClassName("productDescriptionOnThisPageFull")[0].innerHTML.indexOf("|") - 1)
            var fullDesc = document.getElementsByClassName("productDescriptionOnThisPageFull")[0].innerHTML.substring(document.getElementsByClassName("productDescriptionOnThisPageFull")[0].innerHTML.indexOf("|") + 1)

            document.getElementsByClassName("productDescriptionOnThisPageFull")[0].innerHTML = fullDesc

            var headingClone = document.getElementsByClassName("bodyFlexContainer")[0].children[0].cloneNode(true)
            headingClone.children[0].style = 'height: unset;text-align: left;'
            document.getElementsByClassName("bodyFlexContainer")[0].children[0].style = "text-align: left;margin-top:-15px"
            headingClone.children[0].innerHTML = shortDesc
            document.getElementsByClassName("bodyFlexContainer")[0].insertBefore(headingClone, document.getElementsByClassName("bodyFlexContainer")[0].children[0])
        }
    }

}

function MakeContactTelephoneRequired() {



    var currentURL = window.location.href;
    if (currentURL.indexOf('ShoppingCart.aspx') > 0 && document.getElementById("ctl00_PageBody_DeliveryAddress_ContactTelephoneTextBox")) {
        var contactTelephoneInput = document.getElementById("ctl00_PageBody_DeliveryAddress_ContactTelephoneTextBox")
        var contactTelephoneInputParent = contactTelephoneInput.parentElement
        var stateInput = document.getElementById("ctl00_PageBody_DeliveryAddress_County")
        var stateValidator = document.getElementById("ctl00_PageBody_DeliveryAddress_CountyValidator")


        var newContactTelephoneValidator = stateValidator.cloneNode(true)
        newContactTelephoneValidator.setAttribute("data-val-controltovalidate", "ctl00_PageBody_DeliveryAddress_ContactTelephoneTextBox")
        newContactTelephoneValidator.setAttribute("id", "ctl00_PageBody_DeliveryAddress_ContactTelephoneTextBoxValidator")
        if (contactTelephoneInput.value == "") {
            newContactTelephoneValidator.setAttribute("style", "")
        } else {
            newContactTelephoneValidator.setAttribute("style", "display: none;")
        }

        // contactTelephoneInput.setAttribute("onchange", "javascript:setTimeout('__doPostBack(\'ctl00$PageBody$DeliveryAddress$ContactTelephoneTextBox\',\'\')', 0)")
        // contactTelephoneInput.setAttribute("onkeypress", "javascript:setTimeout('__doPostBack(\'ctl00$PageBody$DeliveryAddress$ContactTelephoneTextBox\',\'\')', 0)")
        contactTelephoneInput.setAttribute("class", "aspNetDisabled textInput form-control")

        contactTelephoneInputParent.appendChild(newContactTelephoneValidator)




        document.getElementById("ctl00_PageBody_ContinueButton1").addEventListener("click", function() {
            var addressFields = document.querySelectorAll(".epi-form-group-checkout input");
            if (addressFields) {
                for (var i = 0; i < addressFields.length; i++) {
                    if (addressFields[i].nextElementSibling != null) {
                        if (addressFields[i].nextElementSibling.nodeName == "SPAN") {
                            addressFields[i].setAttribute("required", true);
                        }
                    }
                }
            }
        })

        document.getElementById("ctl00_PageBody_ContinueButton2").addEventListener("click", function() {
            var addressFields = document.querySelectorAll(".epi-form-group-checkout input");
            if (addressFields) {
                for (var i = 0; i < addressFields.length; i++) {
                    if (addressFields[i].nextElementSibling != null) {
                        if (addressFields[i].nextElementSibling.nodeName == "SPAN") {
                            addressFields[i].setAttribute("required", true);
                        }
                    }
                }
            }
        })

        document.getElementById("ctl00_PageBody_BackToCartButton1").addEventListener("click", function() {
            var addressFields = document.querySelectorAll(".epi-form-group-checkout input");
            if (addressFields) {
                for (var i = 0; i < addressFields.length; i++) {
                    if (addressFields[i].nextElementSibling != null) {
                        if (addressFields[i].nextElementSibling.nodeName == "SPAN") {
                            addressFields[i].removeAttribute("required");
                        }
                    }
                }
            }
        })

        document.getElementById("ctl00_PageBody_BackToCartButton2").addEventListener("click", function() {
            var addressFields = document.querySelectorAll(".epi-form-group-checkout input");
            if (addressFields) {
                for (var i = 0; i < addressFields.length; i++) {
                    if (addressFields[i].nextElementSibling != null) {
                        if (addressFields[i].nextElementSibling.nodeName == "SPAN") {
                            addressFields[i].removeAttribute("required");
                        }
                    }
                }
            }
        })

    }


}



function addCheckoutButtonWhenCartHasItem() {
    var currentURL = window.location.href;
    console.log(currentURL)
    console.log(currentURL.indexOf('ShoppingCart.aspx'))
    if (document.getElementById("ctl00_MainMenu_CartInfo_CartLinkText").innerHTML != "0" && currentURL.indexOf('ShoppingCart.aspx') == -1) {
        document.getElementById("SpecialTextDiv").style = "top: -15%;"

        var divNode1 = document.createElement("div");
        var divNode4 = document.createElement("div");
        var imgNode2 = document.createElement("img");
        imgNode2.src = "https://yoders-building-services.github.io/WebTrackPortalScripts/images/output-onlinepngtools-21.png"
        var aNode = document.createElement("a");

        divNode4.onclick = function() { window.location = "https://wt.goyoders.com/ShoppingCart.aspx" };
        // divNode4.onclick = "window.location = 'https://tawportal.epicoranywhere.com/AccountPayment_r.aspx'"
        aNode.innerHTML = "Checkout"
        divNode4.appendChild(aNode)
        divNode4.appendChild(imgNode2)

        divNode1.id = "checkoutButtonDiv"
        divNode4.id = "checkoutButtonText"

        divNode1.appendChild(divNode4);
        var headerBody = document.getElementById("PageHeaderDiv")
        headerBody.appendChild(divNode1)
    } else {
        document.getElementById("SpecialTextDiv").style = "top: 0%;"
    }
}

function ChangeButtonColourAtFinalConfirmation() {

    var currentURL = window.location.href;
    if (currentURL.indexOf('ShoppingCart.aspx') > 0 && document.getElementById("ctl00_PageBody_CompleteCheckoutButton")) {
        document.getElementById("ctl00_PageBody_BackToCartButton5").style = "background-color: #5e5c5c !important; border-color:#5e5c5c !important"
        document.getElementById("ctl00_PageBody_BackToCartButton5").addEventListener('mouseenter', function() {
            document.getElementById("ctl00_PageBody_BackToCartButton5").style = "background-color: #120e0e !important; border-color:#120e0e !important"
        })
        document.getElementById("ctl00_PageBody_BackToCartButton5").addEventListener('mouseleave', function() {
            document.getElementById("ctl00_PageBody_BackToCartButton5").style = "background-color: #5e5c5c !important; border-color:#5e5c5c !important"
        })
        document.getElementById("ctl00_PageBody_BackToCartButton5").parentElement.parentElement.children[1].children[0].style = "background-color: #5e5c5c !important; border-color:#5e5c5c !important"

        document.getElementById("ctl00_PageBody_BackToCartButton5").parentElement.parentElement.children[1].children[0].addEventListener('mouseenter', function() {
            document.getElementById("ctl00_PageBody_BackToCartButton5").parentElement.parentElement.children[1].children[0].style = "background-color: #120e0e !important; border-color:#120e0e !important"
        })
        document.getElementById("ctl00_PageBody_BackToCartButton5").parentElement.parentElement.children[1].children[0].addEventListener('mouseleave', function() {
            document.getElementById("ctl00_PageBody_BackToCartButton5").parentElement.parentElement.children[1].children[0].style = "background-color: #5e5c5c !important; border-color:#5e5c5c !important"
        })
    }

}

function hideCallOffOrders() {
    var x = document.querySelectorAll('a[href="CallOffOrders_r.aspx"]')
    for (var k = 0; k < x.length; k++) {
        x[k].parentNode.style.display = "none"
    }

}


// function HideNameOnDeliveryAddress() {
//     var fields = document.getElementById('ctl00_PageBody_DeliveryAddress_ContactNameTitleLiteral').parentElement.parentElement.parentElement.children[1].children[1].children[1].children[1]


//     console.log(fields)
// }


function CreateMessageAlertAtMakeAPayment() {

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
}

function GetAllDeliveryAddressInfo() {
    var currentURL = window.location.href;
    // var checkoutCheck = document.getElementById('ctl00_PageBody_CustomerAddressSelector_SelectAddressLinkButton')
    var checkoutCheck = document.getElementById('ctl00_PageBody_DeliveryAddress_Country')
    var parentContainer = document.getElementsByClassName("container")[0]
    if ((currentURL.indexOf('ShoppingCart.aspx') > 0) && checkoutCheck) {
        if (document.getElementById('ctl00_PageBody_DeliveryAddress_spacerDiv')) {
            var i = 5
            var x = 2
            while (i < 11 && x < 9) {
                parentContainer.children[4].children[1].children[x].children[1].children[0].value = parentContainer.children[4].children[0].children[i].children[1].children[0].value

                i++
                x++
            }
        } else {
            var i = 4
            var x = 2
            while (i < 11 && x < 9) {
                parentContainer.children[4].children[1].children[x].children[1].children[0].value = parentContainer.children[4].children[0].children[i].children[1].children[0].value

                i++
                x++
            }
        }


    }
}

function MoveEmailAddressFieldCheckout() {
    var currentURL = window.location.href;
    var checkoutCheck = document.getElementById('ctl00_PageBody_DeliveryAddress_Country')
    var parentContainer = document.getElementsByClassName("container")[0]

    if ((currentURL.indexOf('ShoppingCart.aspx') > 0) && checkoutCheck) {
        var emailBox = document.getElementById("ctl00_PageBody_InvoiceAddress_EmailAddressRow")
        var SpotAfterContact = document.getElementById("ctl00_PageBody_DeliveryAddress_ContactTelephoneRow").nextSibling.nextSibling

        parentContainer.children[4].children[0].insertBefore(emailBox, SpotAfterContact)
        document.getElementById("ctl00_PageBody_ContinueButton2").addEventListener("click", GetAllDeliveryAddressInfo);
        document.getElementById("ctl00_PageBody_ContinueButton1").addEventListener("click", GetAllDeliveryAddressInfo);
    }

}


function CheckEmailAddressFieldCheckout() {
    var currentURL = window.location.href;
    var checkoutCheck = document.getElementById('ctl00_PageBody_DeliveryAddress_Country')
    var parentContainer = document.getElementsByClassName("container")[0]
    if ((currentURL.indexOf('ShoppingCart.aspx') > 0) && checkoutCheck) {

        var emailBox = document.getElementById("ctl00_PageBody_InvoiceAddress_EmailAddressTextBox").addEventListener("keydown", function() {
            var emailErrorText = document.getElementById("ctl00_PageBody_InvoiceAddress_EmailAddressRegExValidator")
            var indices = [];
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] === "@") indices.push(i);
            }

            if (indices.length > 1) {
                emailErrorText.innerHTML = "Not a supported email address format - must be one email only"
            } else {
                emailErrorText.innerHTML = "Not a supported email address format"
            }

        })

        var emailBox = document.getElementById("ctl00_PageBody_InvoiceAddress_EmailAddressTextBox").addEventListener("change", function() {
            var emailErrorText = document.getElementById("ctl00_PageBody_InvoiceAddress_EmailAddressRegExValidator")
            var indices = [];
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] === "@") indices.push(i);
            }

            if (indices.length > 1) {
                emailErrorText.innerHTML = "Not a supported email address format - must be one email only"
            } else {
                emailErrorText.innerHTML = "Not a supported email address format"
            }

        })


    }

}