import {
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatSelect,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
  } from '@angular/material';
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
  // Modulo que permite cargar todos aquellos modulos y componentes de Angular Material que vayamos a necesitar
  
  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatButtonModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatToolbarModule,
      MatMenuModule,
      MatSidenavModule,
      MatDividerModule,
      MatListModule,
      MatExpansionModule,
      MatAutocompleteModule,
      MatCardModule,
      MatCheckboxModule,
      MatRadioModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatSelectModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatTabsModule,

    ],
    exports: [
      MatButtonModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatToolbarModule,
      MatMenuModule,
      MatSidenavModule,
      MatDividerModule,
      MatListModule,
      MatExpansionModule,
      MatAutocompleteModule,
      MatCardModule,
      MatCheckboxModule,
      MatRadioModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatSelectModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatTabsModule,
    ]
  })
  export class MaterialModule { }