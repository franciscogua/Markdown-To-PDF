package com.franciscogua.markdowntopdf.controlller;

import com.franciscogua.markdowntopdf.dto.MarkdownRequestDto;
import com.franciscogua.markdowntopdf.service.PdfService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PdfController {
    private final PdfService pdfService;
    
    public PdfController(PdfService pdfService) {
        this.pdfService = pdfService;
    }
    
    @PostMapping("/generate-pdf")
    public ResponseEntity<Void> generatePdf(@RequestBody MarkdownRequestDto requestDto) {
       
        pdfService.generatePdf(requestDto);
        return ResponseEntity.ok().build();
    }
}
