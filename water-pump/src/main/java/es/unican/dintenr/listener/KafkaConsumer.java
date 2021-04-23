package es.unican.dintenr.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

import es.unican.dintenr.model.WaterPumpRead;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class KafkaConsumer {
	private static final Logger logger = LoggerFactory.getLogger(KafkaConsumer.class);
    private static final CsvMapper mapper = new CsvMapper();
    @Autowired
    SimpMessagingTemplate template;

    @KafkaListener(topics = "machine_status",groupId = "frontend-group-id", containerFactory = "kakfaListenerContainerFactory")
    public void listenSenderEmail(String data) throws IOException {
//        WaterPumpRead read = fromCSV(data, WaterPumpRead.class);
//        WaterPumpRead read = fromString(data);
        logger.info("Consumed message: " + data);
        template.convertAndSend("/topic/notif", data);

    }

    /**
     * Convert json to Object
     * @param json String json value
     * @param clazz Instances of the class
     * @param <T> Object Class
     * @return Object class
     * @throws IOException 
     */
    private <T> T fromCSV(String csv, Class<T> clazz) throws IOException {
        try {
        	CsvSchema schema = mapper.schemaFor(clazz);
        	logger.info(schema.toString());
        	return mapper.readerFor(clazz).with(schema).readValue(csv);
        } catch (Exception e) {
            throw new IOException(e.getMessage());
        }
    }
    
    private WaterPumpRead fromString(String csv) {
    	String [] datos = csv.split(",");
    	WaterPumpRead read = new WaterPumpRead();
    	read.setOrder(Integer.parseInt(datos[0]));
    	read.setDate(datos[1]);
    	read.setSensor00(Double.parseDouble(datos[2]));
    	read.setSensor01(Double.parseDouble(datos[3]));
    	read.setSensor02(Double.parseDouble(datos[4]));
    	read.setSensor03(Double.parseDouble(datos[5]));
    	read.setSensor04(Double.parseDouble(datos[6]));
    	read.setSensor05(Double.parseDouble(datos[7]));
    	read.setSensor06(Double.parseDouble(datos[8]));
    	read.setSensor07(Double.parseDouble(datos[9]));
    	read.setSensor08(Double.parseDouble(datos[10]));
    	read.setSensor09(Double.parseDouble(datos[11]));
    	read.setSensor00(Double.parseDouble(datos[12]));
    	read.setSensor11(Double.parseDouble(datos[13]));
    	read.setSensor12(Double.parseDouble(datos[14]));
    	read.setSensor13(Double.parseDouble(datos[15]));
    	read.setSensor14(Double.parseDouble(datos[16]));
    	read.setSensor15(Double.parseDouble(datos[17]));
    	read.setSensor16(Double.parseDouble(datos[18]));
    	read.setSensor17(Double.parseDouble(datos[19]));
    	read.setSensor18(Double.parseDouble(datos[20]));
    	read.setSensor19(Double.parseDouble(datos[21]));
    	read.setSensor20(Double.parseDouble(datos[22]));
    	read.setSensor21(Double.parseDouble(datos[23]));
    	read.setSensor22(Double.parseDouble(datos[24]));
    	read.setSensor23(Double.parseDouble(datos[25]));
    	read.setSensor24(Double.parseDouble(datos[26]));
    	read.setSensor25(Double.parseDouble(datos[27]));
    	read.setSensor26(Double.parseDouble(datos[28]));
    	read.setSensor27(Double.parseDouble(datos[29]));
    	read.setSensor28(Double.parseDouble(datos[30]));
    	read.setSensor29(Double.parseDouble(datos[31]));
    	read.setSensor30(Double.parseDouble(datos[32]));
    	read.setSensor31(Double.parseDouble(datos[33]));
    	read.setSensor32(Double.parseDouble(datos[34]));
    	read.setSensor33(Double.parseDouble(datos[35]));
    	read.setSensor34(Double.parseDouble(datos[36]));
    	read.setSensor35(Double.parseDouble(datos[37]));
    	read.setSensor36(Double.parseDouble(datos[38]));
    	read.setSensor37(Double.parseDouble(datos[39]));
    	read.setSensor38(Double.parseDouble(datos[40]));
    	read.setSensor39(Double.parseDouble(datos[41]));
    	read.setSensor40(Double.parseDouble(datos[42]));
    	read.setSensor41(Double.parseDouble(datos[43]));
    	read.setSensor42(Double.parseDouble(datos[44]));
    	read.setSensor43(Double.parseDouble(datos[45]));
    	read.setSensor44(Double.parseDouble(datos[46]));
    	read.setSensor45(Double.parseDouble(datos[47]));
    	read.setSensor46(Double.parseDouble(datos[48]));
    	read.setSensor47(Double.parseDouble(datos[49]));
    	read.setSensor48(Double.parseDouble(datos[50]));
    	read.setSensor49(Double.parseDouble(datos[51]));
    	read.setSensor50(Double.parseDouble(datos[52]));
    	read.setSensor51(Double.parseDouble(datos[53]));
    	read.setMachine_status(datos[54]);
    	return read;
  
    	
    	
    	
    }
}