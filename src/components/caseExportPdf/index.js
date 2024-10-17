import React from "react";
import { Modal, TextInput } from "flowbite-react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

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
    borderColor: '#000',
    width: '100%',
  },
  inputLine: {
    borderBottomWidth: 1,
    borderColor: '#000',
    width: 500,
  },
  doubleLine: {
    marginBottom: '10px',
    marginTop: '10px',
    borderBottomWidth: 1,
    bordeStyle: 'double',
    borderColor: '#000',
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
    borderColor: '#000',
    justifyContent: 'center',  // Center the tick mark
    alignItems: 'center',      // Center the tick mark
    marginRight: 5,
  },
  smallInput: {
    width: 50,
    borderBottomWidth: 1,
    borderColor: '#000',
    marginLeft: 5,
  },
  largeInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  longLine: {
    borderBottomWidth: 1,
    borderColor: '#000',
    flex: 1,
  },
});

const CaseExportPdfDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%',marginBottom:'2px' }}>
            <Text style={{ fontSize: 12 }} >Seller:</Text>
            {formData?.sellerName ? <Text style={styles.label}>{formData?.sellerName}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%',marginBottom:'2px' }}>
            <Text style={{ fontSize: 12 }} >SS#:</Text>
            {formData?.sellerSSN ? <Text style={styles.label}>{formData?.sellerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%',marginBottom:'2px' }}>
            <Text style={{ fontSize: 12 }} >SS#:</Text>
            {formData?.sellerSSN ? <Text style={styles.label}>{formData?.sellerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%',marginBottom:'2px'  }}>
            <Text style={{ fontSize: 12 }} >Address:</Text>
            {formData?.sellerAddress ? <Text style={styles.label}>{formData?.sellerAddress}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%',marginBottom:'2px' }}>
            <Text style={{ fontSize: 12 }} >Cell:</Text>
            {formData?.sellerCell ? <Text style={styles.label}>{formData?.sellerCell}</Text> : <View style={styles.fullWidthLine} />}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%',marginBottom:'2px' }}>
            <Text style={{ fontSize: 12 }} >Work:</Text>
            {formData?.sellerWork ? <Text style={styles.label}>{formData?.sellerWork}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>
        <View style={styles.doubleLine}></View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%',marginBottom:'2px' }}>
            <Text style={{ fontSize: 12 }} >Seller:</Text>
            {formData?.sellerName ? <Text style={styles.label}>{formData?.sellerName}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%',marginBottom:'2px' }}>
            <Text style={{ fontSize: 12 }} >SS#:</Text>
            {formData?.sellerSSN ? <Text style={styles.label}>{formData?.sellerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%',marginBottom:'2px' }}>
            <Text style={{ fontSize: 12 }} >SS#:</Text>
            {formData?.sellerSSN ? <Text style={styles.label}>{formData?.sellerSSN}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%',marginBottom:'2px'}}>
            <Text style={{ fontSize: 12 }} >Address:</Text>
            {formData?.sellerAddress ? <Text style={styles.label}>{formData?.sellerAddress}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%',marginBottom:'2px' }}>
            <Text style={{ fontSize: 12 }} >Cell:</Text>
            {formData?.sellerCell ? <Text style={styles.label}>{formData?.sellerCell}</Text> : <View style={styles.fullWidthLine} />}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%',marginBottom:'2px' }}>
            <Text style={{ fontSize: 12 }} >Work:</Text>
            {formData?.sellerWork ? <Text style={styles.label}>{formData?.sellerWork}</Text> : <View style={styles.fullWidthLine} />}
          </View>
        </View>
        <View style={styles.doubleLine}></View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%',marginBottom:'2px' }}>
          <Text style={{ fontSize: 12, width: '38%' }} >PREMISES BEING SOLD/BOUGHT: </Text>
          {formData?.sellerAddress ? <Text style={styles.label}>{formData?.sellerAddress}</Text> : <View style={[styles.fullWidthLine, { width: '63%' }]} />}
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' ,marginBottom:'2px' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '45%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '50%', }}>
              <Text style={{ fontSize: 12 }}>Block:</Text>
              {formData?.block ? <Text style={styles.label}>{formData?.block}</Text> : <View style={styles.fullWidthLine} />}
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '50%', }}>
              <Text style={{ fontSize: 12 }}>Lot:</Text>
              {formData?.lot ? <Text style={styles.label}>{formData?.lot}</Text> : <View style={styles.fullWidthLine} />}
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '5%' }}>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2}}>New Const</Text>
            </View>

            {/* Second Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2}}>1 Family</Text>
            </View>

            {/* Third Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginLeft: 2, fontSize: 12, marginRight: 2}}>2 Family</Text>
            </View>
          </View>
        </View>

      </View>

    </Page>
  </Document>
);



const CaseExportPdf = ({ onClose }) => {
  const client = useSelector((state) => state.client?.client?.data[0]);
  const address = useSelector((state) => state.utils?.address?.data[0]);
  const { casesData } = useSelector((state) => state.case);
  const caseObj = casesData?.cases?.find(item => item.caseId === localStorage.getItem('c_id'));
  const { data: premisesData } = useSelector((state) => state?.premises?.premises);
  const premisesDetails = premisesData?.length > 0 ? premisesData : null;

  const formData = {
    sellerName: caseObj?.caseType == 0 ? client?.firstName : "",
    sellerSSN: caseObj?.caseType == 0 ? client?.ssn : "",
    sellerAddress: caseObj?.caseType == 0 ? client?.addressId : "",
    sellerCell: caseObj?.caseType == 0 ? client?.cellNumber : "",
    sellerWork: caseObj?.caseType == 0 ? client?.workPhone : "",
    buyerName: caseObj?.caseType == 1 ? client?.firstName : "",
    buyerSSN: caseObj?.caseType == 1 ? client?.ssn : "",
    buyerAddress: caseObj?.caseType == 1 ? client?.addressId : "",
    buyerCell: caseObj?.caseType == 1 ? client?.cellNumber : "",
    buyerWork: caseObj?.caseType == 1 ? client?.firstName : "",
    block: premisesDetails?.block,
    lot: premisesDetails?.lot,
    newConst: true,
    isOneFamily: premisesDetails?.isTwoFamily == 1 ? true : false,
    isTwoFamily: premisesDetails?.isTwoFamily == 1 ? true : false,
  };


  return (
    <Modal show={true} size="md" onClose={onClose} className="export-pdf-modal">
      <Modal.Header className="border-b-0">
        <h2 className="text-[28px] leading-9 font-medium text-secondary-800">Export</h2>
      </Modal.Header>
      <Modal.Body>
        {/* PDF Preview */}
        <div className="mb-4" style={{ height: '500px', border: '1px solid #ccc' }}>
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
              backgroundColor: '#3b82f6',
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
