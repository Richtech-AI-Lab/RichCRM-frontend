import React from "react";
import { Modal, TextInput } from "flowbite-react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { maintenanceFeePer } from "../../constants/constants";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    display: 'flex'
  },
  fullWidthLine: {
    borderBottomWidth: 1,
    borderColor: '000',
    width: '100%',
    marginRight: '10px'
  },
  inputLine: {
    borderBottomWidth: 1,
    borderColor: '000',
    width: 500,
  },
  doubleLine: {
    marginBottom: '10px',
    marginTop: '10px',
    borderBottomWidth: 1,
    bordeStyle: 'double',
    borderColor: '000',
    border: '1px double black',
    width: '100%',
  },
  label: {
    // width: 100,
    fontSize: 12,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '000',
    justifyContent: 'center',  // Center the tick mark
    alignItems: 'center',      // Center the tick mark
  },
  smallInput: {
    width: 50,
    borderBottomWidth: 1,
    borderColor: '000',
    marginLeft: 5,
  },
  largeInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '000',
  },
  longLine: {
    borderBottomWidth: 1,
    borderColor: '000',
    flex: 1,
  },
});

const CaseExportPdfDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px', }} >Seller:</Text>
            {formData?.sellerName ? <Text style={styles.label}>{formData?.sellerName}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >SS:</Text>
            {formData?.sellerSSN ? <Text style={styles.label}>{formData?.sellerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >SS:</Text>
            {formData?.sellerSSN ? <Text style={styles.label}>{formData?.sellerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Address:</Text>
            {formData?.sellerAddress ? <Text style={styles.label}>{formData?.sellerAddress}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Cell:</Text>
            {formData?.sellerCell ? <Text style={styles.label}>{formData?.sellerCell}</Text> : <View style={styles.fullWidthLine} />}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Work:</Text>
            {formData?.sellerWork ? <Text style={styles.label}>{formData?.sellerWork}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>
        <View style={styles.doubleLine}></View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Buyer:</Text>
            {formData?.buyerName ? <Text style={styles.label}>{formData?.buyerName}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >SS:</Text>
            {formData?.buyerSSN ? <Text style={styles.label}>{formData?.buyerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >SS:</Text>
            {formData?.buyerSSN ? <Text style={styles.label}>{formData?.buyerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Address:</Text>
            {formData?.buyerAddress ? <Text style={styles.label}>{formData?.buyerAddress}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Cell:</Text>
            {formData?.buyerCell ? <Text style={styles.label}>{formData?.buyerCell}</Text> : <View style={styles.fullWidthLine} />}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Work:</Text>
            {formData?.buyerWork ? <Text style={styles.label}>{formData?.buyerWork}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>
        <View style={styles.doubleLine}></View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
          <Text style={{ fontSize: 12, marginRight: '10px', width: '38%' }} >PREMISES BEING SOLD/BOUGHT: </Text>
          {formData?.sellerAddress ? <Text style={styles.label}>{formData?.caseType}</Text> : <View style={[styles.fullWidthLine, { width: '63%' }]} />}
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '45%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '50%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>Block:</Text>
              {formData?.block ? <Text style={styles.label}>{formData?.block}</Text> : <View style={styles.fullWidthLine} />}
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '50%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>Lot:</Text>
              {formData?.lot ? <Text style={styles.label}>{formData?.lot}</Text> : <View style={styles.fullWidthLine} />}
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '5%' }}>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>New Const</Text>
            </View>

            {/* Second Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>1 Family</Text>
            </View>

            {/* Third Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>2 Family</Text>
            </View>
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '45%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>SECTION:</Text>
              {formData?.section ? <Text style={{ fontSize: 12, marginRight: '10px' }} >{formData?.section}</Text> : <View style={styles.fullWidthLine} />}
            </View>


          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '5%' }}>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>Condo</Text>
            </View>

            {/* Second Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>Co-op</Text>
            </View>

            {/* Third Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>Townhouse</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>Vacant Land</Text>
            </View>
          </View>
        </View>


        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>Vacant at closing</Text>
            </View>

            {/* Second Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>Subject to tenancy</Text>
            </View>

            {/* Third Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>H.O.A</Text>
            </View>
          </View>
          {/* <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}> */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.checkbox}></View>
            <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>Parking Space</Text>
            {formData?.parkingSpace ? <Text style={styles.label}>{formData?.parkingSpace}</Text> : <View style={{ ...styles.fullWidthLine, width: 60 }} />}
            {/* </View> */}
          </View>
        </View>


        {/* Maintenance fee section */}
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '60%', marginBottom: '2px' }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }} >Maintenance Fee $:</Text>
              {formData?.maintanceFee ? <Text style={styles.label}>{formData?.maintanceFee}</Text> : <View style={styles.fullWidthLine} />}
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: '40%', marginBottom: '2px' }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }} >per</Text>
              {formData?.maintenanceFeePer ? <Text style={styles.label}>{formData?.maintenanceFeePer}</Text> : <View style={styles.fullWidthLine} />}
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '60%', marginBottom: '2px' }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }} >Assessment:</Text>
              {formData?.assessment ? <Text style={styles.label}>{formData?.assessment}</Text> : <View style={styles.fullWidthLine} />}
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: '40%', marginBottom: '2px' }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }} >Paid by:</Text>
              {formData?.assessmentPaidBy ? <Text style={styles.label}>{formData?.assessmentPaidBy}</Text> : <View style={styles.fullWidthLine} />}
            </View>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px', }} >Managing Company:</Text>
            {formData?.managingCompany ? <Text style={styles.label}>{formData?.managingCompany}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '20%' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }}>If 2 family: 1st floor: </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '80%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '25%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>Tenant name:</Text>
              {formData?.onefName ? <Text style={styles.label}>{formData?.onefName}</Text> : <View style={styles.fullWidthLine} />}
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '25%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>Rent:</Text>
              {false ? <Text style={styles.label}>{formData?.lot}</Text> : <View style={styles.fullWidthLine} />}
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: '25%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>Sec:</Text>
              {false ? <Text style={styles.label}>{formData?.block}</Text> : <View style={styles.fullWidthLine} />}
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '25%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>Lease:</Text>
              {false ? <Text style={styles.label}>{formData?.lot}</Text> : <View style={styles.fullWidthLine} />}
            </View>
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '22%' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }}>If 2 family: 2nd floor:</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '78%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '25%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>Tenant name:</Text>
              {formData?.secfName ? <Text style={styles.label}>{formData?.secfName}</Text> : <View style={styles.fullWidthLine} />}
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '25%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>Rent:</Text>
              {false ? <Text style={styles.label}>{formData?.lot}</Text> : <View style={styles.fullWidthLine} />}
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: '25%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>Sec:</Text>
              {false ? <Text style={styles.label}>{formData?.block}</Text> : <View style={styles.fullWidthLine} />}
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '25%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>Lease:</Text>
              {false ? <Text style={styles.label}>{formData?.lot}</Text> : <View style={styles.fullWidthLine} />}
            </View>
          </View>
        </View>

        <View style={styles.doubleLine}></View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Purchase price:</Text>
            {false ? <Text style={styles.label}>{formData?.sellerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >MTG amount:</Text>
            {false ? <Text style={styles.label}>{formData?.sellerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Down Payment:</Text>
            {false ? <Text style={styles.label}>{formData?.sellerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Annual property:</Text>
            {false ? <Text style={styles.label}>{formData?.sellerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Seller concesion :</Text>
            {false ? <Text style={styles.label}>{formData?.sellerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={styles.doubleLine}></View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '35%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <Text style={{ fontSize: 12, marginRight: '10px' }}>Closing Date:</Text>
              {false ? <Text style={styles.label}>{formData?.block}</Text> : <View style={styles.fullWidthLine} />}
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '5%' }}>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '60%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>on/or about</Text>
            </View>

            {/* Second Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>before</Text>
            </View>

            {/* Third Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>T.O.E</Text>
            </View>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '60%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px' }} >Engineer Inspection :</Text>
            {formData?.engineerInspectionDate ? <Text style={styles.label}>{formData?.engineerInspectionDate}</Text> : <View style={styles.fullWidthLine} />}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '40%' }}>

            {/* Second Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {formData?.engineerInspection ? <View style={styles.checkbox}></View>: <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>✓</Text>}
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>Yes</Text>
            </View>

            {/* Third Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2 }}>No</Text>
            </View>
          </View>
        </View>

        <View style={styles.doubleLine}></View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
          <Text style={{ fontSize: 12, marginRight: '10px', }} >Seller Atty:</Text>
          {false ? <Text style={styles.label}>{formData?.sellerName}</Text> : <View style={styles.fullWidthLine} />}
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
          <Text style={{ fontSize: 12, marginRight: '10px', }} >Buyer Atty:</Text>
          {false ? <Text style={styles.label}>{formData?.sellerName}</Text> : <View style={styles.fullWidthLine} />}
        </View>

        <View style={styles.doubleLine}></View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>

          <View style={{ display: 'flex', flexDirection: 'row', width: '10%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px', }} >Brokers:</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', width: '90%', marginBottom: '2px' }}>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
              <Text style={{ fontSize: 12, marginRight: '10px', }} >Seller Atty:</Text>
              {false ? <Text style={styles.label}>{formData?.sellerName}</Text> : <View style={styles.fullWidthLine} />}
            </View>
          </View>

        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>

          <View style={{ display: 'flex', flexDirection: 'row', width: '10%', marginBottom: '2px' }}>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', width: '90%', marginBottom: '2px' }}>


            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
              <Text style={{ fontSize: 12, marginRight: '10px', }} >Buyer Atty:</Text>
              {false ? <Text style={styles.label}>{formData?.sellerName}</Text> : <View style={styles.fullWidthLine} />}
            </View>
          </View>

        </View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px', }} >Referred By:</Text>
            {false ? <Text style={styles.label}>{formData?.sellerName}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px', }} >Bank (L/O):</Text>
            {false ? <Text style={styles.label}>{formData?.sellerName}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px', }} >Personal Property:</Text>
            {false ? <Text style={styles.label}>{formData?.sellerName}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '2px' }}>
            <Text style={{ fontSize: 12, marginRight: '10px', }} >Excluded Property:</Text>
            {false ? <Text style={styles.label}>{formData?.sellerName}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={styles.doubleLine}></View>
      </View>

    </Page>
  </Document>
);



const CaseExportPdf = ({ onClose }) => {
  const client = useSelector((state) => state.client?.client?.data[0]);
  const address = useSelector((state) => state.utils?.address?.data[0]);
  const { casesData } = useSelector((state) => state.case);
  const caseObj = casesData?.cases?.find(item => item.caseId === localStorage.getItem('c_id'));
  const premisesData  = useSelector((state) => state?.premises?.premises?.data[0]);
  const premisesDetails = premisesData?.length > 0 ? premisesData : null;

  const formData = {
    caseType: caseObj?.caseType == 0 ? "SOLD": "PURCHASE",
    sellerName: caseObj?.caseType == 0 ? client?.firstName : false,
    sellerSSN: caseObj?.caseType == 0 ? client?.ssn : false,
    sellerAddress: caseObj?.caseType == 0 ? client?.addressId : false,
    sellerCell: caseObj?.caseType == 0 ? client?.cellNumber : false,
    sellerWork: caseObj?.caseType == 0 ? client?.workPhone : false,
    buyerName: caseObj?.caseType == 1 ? client?.firstName : false,
    buyerSSN: caseObj?.caseType == 1 ? client?.ssn : false,
    buyerAddress: caseObj?.caseType == 1 ? client?.addressId : false,
    buyerCell: caseObj?.caseType == 1 ? client?.cellNumber : false,
    buyerWork: caseObj?.caseType == 1 ? client?.firstName : false,
    premisesType: premisesData?.premisesType,
    block: premisesData?.block,
    section: premisesData?.section,
    lot: premisesData?.lot,
    newConst: true,
    isOneFamily: premisesData?.isTwoFamily == 1 ? true : false,
    isTwoFamily: premisesData?.isTwoFamily == 1 ? true : false,
    condo: premisesData?.propertyType == 2 ? true : false,
    coop: premisesData?.propertyType == 5 ? true : false,
    townhouse:premisesData?.propertyType == 3 ? true : false,
    vacantLand: premisesData?.propertyType == 4 ? true : false,
    vacantAtClosing: premisesData?.vacantAtClosing == 1 ? true : false,
    suvjectToTenancy:premisesData?.subjectToTenancy == 1 ? true : false,
    hoa: premisesData?.hoa == 1 ? true : false,
    parkingSpace: premisesData?.parkingSpaces ? premisesData?.parkingSpaces  : false,
    maintanceFee: premisesData?.maintenanceFee ?  premisesData?.maintenanceFee : false,
    maintenanceFeePer : premisesData?.maintenanceFeePer ?  maintenanceFeePer[premisesData?.maintenanceFeePer]: false,
    assessment: premisesData?.assessments ? premisesData?.assessments : false,
    assessmentPaidBy: premisesData?.assessmentsPaidById ? premisesData?.assessmentsPaidById : false,
    managingCompany: premisesData?.managingCompany ? premisesData?.managingCompany : false,
    onefName: premisesData?.tenant?.length > 0 ? premisesData?.tenant[0]?.firstName : false,
    onefRent: premisesData?.tenant?.length > 0 ? premisesData?.tenant[0]?.firstName : false,
    onefSec: premisesData?.tenant?.length > 0 ? premisesData?.tenant[0]?.firstName : false,
    onefLease: premisesData?.tenant?.length > 0 ? premisesData?.tenant[0]?.firstName : false,
    secfName: premisesData?.tenant?.length > 1 ? premisesData?.tenant[1]?.firstName : false,
    secfRent: premisesData?.tenant?.length > 1 ? premisesData?.tenant[1]?.firstName : false,
    secfSec: premisesData?.tenant?.length > 1 ? premisesData?.tenant[1]?.firstName : false,
    secfLease: premisesData?.tenant?.length > 1 ? premisesData?.tenant[1]?.firstName : false,
    closingDate: caseObj?.closingDate ? format(caseObj?.closingDate, 'MMMM dd, yyyy'): false, 
    engineerInspection: premisesData?.needInspection == 1 ? true : false,
    engineerInspectionDate: premisesData?.inspectionDate  ? format(premisesData?.inspectionDate , 'MMMM dd, yyyy'): false, 
    sellerAttorney: premisesData?.isTwoFamily == 1 ? true : false,
    buyerAttorney: premisesData?.isTwoFamily == 1 ? true : false,
  };


  return (
    <Modal show={true} size="md" onClose={onClose} className="export-pdf-modal">
      <Modal.Header className="border-b-0">
        <h2 className="text-[28px] leading-9 font-medium text-secondary-800">Export</h2>
      </Modal.Header>
      <Modal.Body>
        {/* PDF Preview */}
        <div className="mb-4" style={{ height: '500px', border: '1px solid ccc' }}>
          <PDFViewer width="100%" height="100%">
            <CaseExportPdfDocument formData={formData} />
          </PDFViewer>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-card-300 shadow-shadow-light text-sm text-primary2 py-[10px] px-6 rounded-[100px] font-medium"
          >
            Cancel
          </button>
          <PDFDownloadLink
            document={<CaseExportPdfDocument formData={formData} />}
            fileName="case-export.pdf"
            style={{
              textDecoration: 'none',
              backgroundColor: '3b82f6',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '100px'
            }}
          >
            {({ loading }) => (loading ? 'Loading document...' : 'Print Pdf')}
          </PDFDownloadLink>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CaseExportPdf;
